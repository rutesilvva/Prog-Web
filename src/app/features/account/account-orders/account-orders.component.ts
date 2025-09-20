import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
}

@Component({
  selector: 'app-account-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent {
  orders: Order[] = [
    { id: 101, date: '10/09/2025', status: 'Concluído', total: 219 },
    { id: 102, date: '15/09/2025', status: 'Em andamento', total: 120 },
    { id: 103, date: '20/09/2025', status: 'Cancelado', total: 0 },
  ];
}
