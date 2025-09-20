import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;          // uid
  slug: string;
  title: string;
  price: number;
  img: string;
  category?: string;
  digital?: boolean;    // e-book?
  downloadUrl?: string; // se for digital
}

const LS_KEY = 'products';

const seed: Product[] = [
  { id:'1', slug:'kubernetes-dev',   title:'Kubernetes para desenvolvedores', price:120, img:'/assets/prod/kubernetes.png' },
  { id:'2', slug:'redes-linux',      title:'Redes Linux Avançadas',           price: 89, img:'/assets/prod/linux-network.png' },
  { id:'3', slug:'arquitetura-moderna', title:'Arquitetura de Software Moderna', price: 99, img:'/assets/prod/arch-modern.png', digital:true, downloadUrl:'#' },
  { id:'4', slug:'ml-essencial',     title:'Aprendizado de Máquina Essencial', price: 79, img:'/assets/prod/ml.png', digital:true, downloadUrl:'#' },
  { id:'5', slug:'typescript',       title:'TypeScript Completo',              price:110, img:'/assets/prod/typescript.png' },
];

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _items = new BehaviorSubject<Product[]>(this.load());
  items$ = this._items.asObservable();

  private load(): Product[] {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      return Array.isArray(saved) ? saved : seed;
    } catch { return seed; }
  }
  private persist(list: Product[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  list() { return this._items.value; }
  bySlug(slug: string) { return this._items.value.find(p => p.slug === slug) || null; }

  add(p: Omit<Product, 'id'>) {
    const id = crypto.randomUUID?.() || String(Date.now());
    const item: Product = { id, ...p };
    const list = [...this._items.value, item];
    this._items.next(list); this.persist(list);
  }

  update(id: string, patch: Partial<Product>) {
    const list = this._items.value.map(p => p.id === id ? { ...p, ...patch } : p);
    this._items.next(list); this.persist(list);
  }

  remove(id: string) {
    const list = this._items.value.filter(p => p.id !== id);
    this._items.next(list); this.persist(list);
  }
}
