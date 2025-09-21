import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../../core/services/cart.service';
import { ProductsService } from './products.service';

import { AuthService, User } from './auth.service';


export type OrderStatus = 'novo' | 'pago' | 'enviado' | 'concluido' | 'cancelado';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customer: { name: string; email: string };
  downloads?: { title: string; url: string }[];
}

const LS_KEY = 'orders';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private _orders = new BehaviorSubject<Order[]>(this.load());
  orders$ = this._orders.asObservable();

  constructor(
    private products: ProductsService,
    private auth: AuthService
  ) {}

  /** 🔄 Carrega pedidos do localStorage */
  private load(): Order[] {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
    catch { return []; }
  }

  /** 💾 Salva pedidos no localStorage */
  private persist(list: Order[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  /** 🆕 Cria um novo pedido associado ao usuário logado */
  createOrder(items: CartItem[], total: number) {
    const user: User | null = this.auth.user;
    if (!user) {
      throw new Error('Nenhum usuário logado. Não é possível criar pedido.');
    }

    // coleta de downloads digitais (e-books)
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
      customer: { name: user.name, email: user.email },
      downloads
    };

    const list = [order, ...this._orders.value];
    this._orders.next(list);
    this.persist(list);

    return order.id;
  }

  /** 🔄 Atualiza status de um pedido */
  updateStatus(id: string, status: OrderStatus) {
    const list = this._orders.value.map(o =>
      o.id === id ? { ...o, status } : o
    );
    this._orders.next(list);
    this.persist(list);
  }

  /** 🔎 Retorna apenas os pedidos do usuário logado */
  getMyOrders(): Order[] {
    const user = this.auth.user;
    if (!user) return [];
    return this._orders.value.filter(o => o.customer.email === user.email);
  }
}
