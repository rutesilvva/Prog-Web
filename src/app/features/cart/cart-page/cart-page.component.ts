import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems.subscribe(data => this.items = data);
  }

  /** Atualizar quantidade */
  updateQty(slug: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input?.value || 1);
    this.cartService.changeQty(slug, value);
  }

  /** Remover item */
  removeItem(slug: string) {
    this.cartService.removeFromCart(slug);
  }

  /** Limpar carrinho */
  clearCart() {
    this.cartService.clearCart();
  }

  /** Total do carrinho */
  get total() {
    return this.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  }
}