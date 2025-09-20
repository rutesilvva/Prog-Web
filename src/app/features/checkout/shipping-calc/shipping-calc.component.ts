import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ShippingOption {
  type: string;
  deadline: string;
  price: number;
}

@Component({
  selector: 'app-shipping-calc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shipping-calc.component.html',
  styleUrls: ['./shipping-calc.component.scss']
})
export class ShippingCalcComponent {
  cep = '';
  loading = false;
  options: ShippingOption[] = [];

  @Output() freightSelected = new EventEmitter<number>();

  calcShipping() {
    this.loading = true;

    setTimeout(() => {
      this.options = [
        { type: 'Frete Grátis', deadline: '7 a 10 dias', price: 0 },
        { type: 'PAC', deadline: '5 a 7 dias', price: 20 },
        { type: 'Sedex', deadline: '2 a 3 dias', price: 40 }
      ];
      this.loading = false;
    }, 1200);
  }

  selectOption(price: number) {
    this.freightSelected.emit(price);
  }
}
