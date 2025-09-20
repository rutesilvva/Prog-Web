import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../../core/services/cart.service';
import { ProductsService } from './products.service';

export type OrderStatus = 'novo' | 'pago' | 'enviado' | 'concluido' | 'cancelado';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customer?: { name: string; email: string };
  downloads?: { title: string; url: string }[]; // e-books coletados
}

const LS_KEY = 'orders';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private _orders = new BehaviorSubject<Order[]>(this.load());
  orders$ = this._orders.asObservable();

  constructor(private products: ProductsService) {}

  private load(): Order[] {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
    catch { return []; }
  }
  private persist(list: Order[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  createOrder(items: CartItem[], total: number, customer?: {name:string; email:string}) {
    // coleta de downloads digitais
    const downloads = items
      .map(i => this.products.bySlug(i.slug))
      .filter(p => p?.digital && p.downloadUrl)
      .map(p => ({ title: p!.title, url: p!.downloadUrl! }));

    const order: Order = {
      id: crypto.randomUUID?.() || String(Date.now()),
      date: new Date().toISOString(),
      items: JSON.parse(JSON.stringify(items)),
      total,
      status: 'novo',
      customer,
      downloads
    };
    const list = [order, ...this._orders.value];
    this._orders.next(list);
    this.persist(list);
    return order.id;
  }

  updateStatus(id: string, status: OrderStatus) {
    const list = this._orders.value.map(o => o.id === id ? { ...o, status } : o);
    this._orders.next(list); this.persist(list);
  }
}
