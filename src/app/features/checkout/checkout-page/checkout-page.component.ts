import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ShippingCalcComponent } from '../shipping-calc/shipping-calc.component';
import { PaymentWidgetComponent } from '../payment-widget/payment-widget.component';
import { CartService, CartItem } from '../../../../core/services/cart.service';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ShippingCalcComponent, PaymentWidgetComponent, CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  cartItems: CartItem[] = [];
  shippingCost = 0;
  paymentMethod: 'pix' | 'card' | 'boleto' = 'pix';
  orderConfirmed = false;

  constructor(
    private cart: CartService,
    private orders: OrdersService,
    private router: Router
  ) {
    this.cart.cartItems.subscribe(items => this.cartItems = items);
  }

  get subtotal() { return this.cartItems.reduce((s, i) => s + i.price * i.quantity, 0); }
  get total() { return this.subtotal + this.shippingCost; }

  onFreightSelected(price: number) { this.shippingCost = price; }
  onPaid(method: 'pix'|'card'|'boleto') { this.paymentMethod = method; }

  confirmOrder() {
    const id = this.orders.createOrder({
      items: this.cartItems,
      paymentMethod: this.paymentMethod,
      shipping: this.shippingCost
    });
    this.orderConfirmed = true;
    this.cart.clearCart();

    setTimeout(() => {
      this.orderConfirmed = false;
      this.router.navigate(['/account'], { queryParams: { last: id }});
    }, 1500);
  }
}
