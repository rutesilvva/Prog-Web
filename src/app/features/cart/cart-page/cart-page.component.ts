import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CartItem {
  title: string;
  price: number;
  qty: number;
  img: string;
}

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cart: CartItem[] = [
    { title: 'Livro de Angular', price: 99, qty: 1, img: '/assets/prod/angular.png' },
    { title: 'Livro de Machine Learning', price: 120, qty: 2, img: '/assets/prod/ml.png' }
  ];

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }
}
