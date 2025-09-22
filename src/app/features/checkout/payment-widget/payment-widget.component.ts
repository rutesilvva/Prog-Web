import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-widget.component.html',
  styleUrls: ['./payment-widget.component.scss']
})
export class PaymentWidgetComponent {
  method: 'pix' | 'card' | 'boleto' = 'pix';
  cardNumber = ''; holder = ''; cvv = '';

  @Output() paid = new EventEmitter<'pix' | 'card' | 'boleto'>();

  confirm() {
    this.paid.emit(this.method);
  }
}
