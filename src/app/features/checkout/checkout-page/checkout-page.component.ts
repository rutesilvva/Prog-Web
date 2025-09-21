import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShippingCalcComponent } from '../shipping-calc/shipping-calc.component';
import { CartService, CartItem } from '../../../../core/services/cart.service';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ShippingCalcComponent],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  cartItems: CartItem[] = [];
  orderConfirmed = false;
  shippingCost = 0;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,  // ⬅️ injete aqui
    private router: Router
  ) {
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
    });
  }

  get subtotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get total() {
    return this.subtotal + this.shippingCost;
  }

  onFreightSelected(price: number) {
    this.shippingCost = price;
  }

  confirmOrder() {
    // cria pedido vinculado ao usuário logado
    this.ordersService.createOrder(this.cartItems, this.total);

    this.cartService.clearCart();
    this.orderConfirmed = true;

    setTimeout(() => {
      this.orderConfirmed = false;
      this.router.navigate(['/home']);
    }, 2000);
  }
}
