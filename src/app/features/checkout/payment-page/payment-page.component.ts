import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {
  selectedMethod: string = '';
  cardData = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  confirmPayment() {
    if (!this.selectedMethod) {
      alert('Selecione um método de pagamento.');
      return;
    }

    if (this.selectedMethod === 'card' &&
        (!this.cardData.number || !this.cardData.name || !this.cardData.expiry || !this.cardData.cvv)) {
      alert('Preencha todos os campos do cartão.');
      return;
    }

    console.log('Pagamento confirmado via:', this.selectedMethod, this.cardData);
    alert('Pagamento processado com sucesso!');
  }
}
