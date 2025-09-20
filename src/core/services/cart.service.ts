import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  slug: string;
  title: string;
  price: number;
  img: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = this.load();
  private items$ = new BehaviorSubject<CartItem[]>(this.items);

  private totalQty$ = new BehaviorSubject<number>(this.getTotalQty());

  get cartItems() {
    return this.items$.asObservable();
  }

  get totalQtyObservable() {
    return this.totalQty$.asObservable();
  }

  addToCart(p: Omit<CartItem, 'quantity'>) {
    const found = this.items.find(i => i.slug === p.slug);
    if (found) found.quantity++;
    else this.items.push({ ...p, quantity: 1 });

    this.saveAndEmit();
  }

  removeFromCart(slug: string) {
    this.items = this.items.filter(i => i.slug !== slug);
    this.saveAndEmit();
  }

  changeQty(slug: string, qty: number) {
    const item = this.items.find(i => i.slug === slug);
    if (!item) return;
    item.quantity = Math.max(1, qty);
    this.saveAndEmit();
  }

  clearCart() {
    this.items = [];
    this.saveAndEmit();
  }

  private getTotalQty(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  private saveAndEmit() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.items$.next([...this.items]);
    this.totalQty$.next(this.getTotalQty()); 
  }

  private load(): CartItem[] {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
    catch { return []; }
  }
}
