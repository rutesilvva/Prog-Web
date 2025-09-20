import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService, Order, OrderStatus } from '../../../core/services/orders.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders-page.component.html',
  styleUrls: ['./admin-orders-page.component.scss']
})
export class AdminOrdersPageComponent {
  orders: Order[] = [];
  statuses: OrderStatus[] = ['novo','pago','enviado','concluido','cancelado'];

  constructor(private os: OrdersService) {
    this.os.orders$.subscribe(list => this.orders = list);
  }

  updateStatus(o: Order, s: OrderStatus) {
    this.os.updateStatus(o.id, s);
  }
}
