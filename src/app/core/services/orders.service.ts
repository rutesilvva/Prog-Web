import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../../core/services/cart.service';
import { ProductsService } from './products.service';
import { AuthService } from './auth.service';

export type OrderStatus = 'novo' | 'pago' | 'enviado' | 'concluido' | 'cancelado';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'pix' | 'card' | 'boleto';
  status: OrderStatus;
  customer: { name: string; email: string };
  downloads?: { title: string; url: string }[];
}

const LS_KEY = 'orders';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private _orders$ = new BehaviorSubject<Order[]>(this.load());
  orders$ = this._orders$.asObservable();

  constructor(private products: ProductsService, private auth: AuthService) {}

  private load(): Order[] {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
    catch { return []; }
  }
  private persist(list: Order[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  private collectDownloads(items: CartItem[]) {
    return items
      .map(i => this.products.bySlug(i.slug))
      .filter(p => p?.digital && p.downloadUrl)
      .map(p => ({ title: p!.title, url: p!.downloadUrl! }));
  }

  createOrder(params: {
    items: CartItem[];
    paymentMethod: 'pix' | 'card' | 'boleto';
    shipping: number;
  }) {
    const user = this.auth.user ?? { name: 'Convidado', email: 'guest@local' };
    const subtotal = params.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const total = subtotal + params.shipping;

    const order: Order = {
      id: crypto.randomUUID?.() || String(Date.now()),
      date: new Date().toISOString(),
      items: JSON.parse(JSON.stringify(params.items)),
      subtotal,
      shipping: params.shipping,
      total,
      paymentMethod: params.paymentMethod,
      status: 'novo',
      customer: { name: user.name, email: user.email },
      downloads: this.collectDownloads(params.items)
    };

    const list = [order, ...this._orders$.value];
    this._orders$.next(list);
    this.persist(list);
    this.mockEmail(order);
    return order.id;
  }

  getByUser(email: string) {
    return this._orders$.value.filter(o => o.customer.email === email);
  }

  updateStatus(id: string, status: OrderStatus) {
    const list = this._orders$.value.map(o => o.id === id ? { ...o, status } : o);
    this._orders$.next(list);
    this.persist(list);
  }

  private mockEmail(order: Order) {
    const emails = JSON.parse(localStorage.getItem('emails') || '[]');
    emails.unshift({
      to: order.customer.email,
      subject: `Confirmação do pedido ${order.id}`,
      body: `Olá ${order.customer.name}, recebemos seu pedido no valor de ${order.total}.`
    });
    localStorage.setItem('emails', JSON.stringify(emails));
  }
}
