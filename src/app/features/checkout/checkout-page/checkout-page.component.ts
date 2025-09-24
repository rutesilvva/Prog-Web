import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ShippingCalcComponent } from '../shipping-calc/shipping-calc.component';
import { PaymentWidgetComponent } from '../payment-widget/payment-widget.component';
import { CartService, CartItem } from '../../../../core/services/cart.service';
import { OrdersService } from '../../../core/services/orders.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,            // <-- necessário para ngModel
    ShippingCalcComponent, 
    PaymentWidgetComponent, 
    CurrencyPipe
  ],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  // Carrinho e valores
  cartItems: CartItem[] = [];
  shippingCost = 0;
  paymentMethod: 'pix' | 'card' | 'boleto' = 'pix';
  orderConfirmed = false;

  // Formulário do cliente
  name: string = '';
  email: string = '';
  cep: string = '';
  street: string = '';
  city: string = '';

  constructor(
    private cart: CartService,
    private orders: OrdersService,
    private router: Router
  ) {
    // Observa alterações no carrinho
    this.cart.cartItems.subscribe(items => this.cartItems = items);
  }

  // Cálculos
  get subtotal() {
    return this.cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  }

  get total() {
    return this.subtotal + this.shippingCost;
  }

  // Funções do carrinho
  onFreightSelected(price: number) {
    this.shippingCost = price;
  }

  onPaid(method: 'pix' | 'card' | 'boleto') {
    this.paymentMethod = method;
  }

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
      this.router.navigate(['/account'], { queryParams: { last: id } });
    }, 1500);
  }

  async lookupCEP() {
  if (!this.cep) return;

  // Remove tudo que não é número
  const cleanCep = this.cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    alert('CEP inválido');
    this.street = '';
    this.city = '';
    return;
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (!data.erro) {
      this.street = data.logradouro;
      this.city = data.localidade;
    } else {
      alert('CEP não encontrado');
      this.street = '';
      this.city = '';
    }
  } catch (err) {
    console.error('Erro ao consultar CEP:', err);
    alert('Erro ao consultar o CEP. Tente novamente.');
  }
}

}
