import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  cartItems = [
    { title: 'Kubernetes para desenvolvedores', price: 120 },
    { title: 'Arquitetura de Software Moderna', price: 99 }
  ];

  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}
