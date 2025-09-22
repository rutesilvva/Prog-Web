import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {OrdersService, Order,OrderStatus} from '../../../core/services/orders.service';

@Component({
  selector: 'app-orders-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-admin-page.component.html',
  styleUrls: ['./orders-admin-page.component.scss']
})
export class OrdersAdminPageComponent {
  orders: Order[] = [];
  statuses: OrderStatus[] = ['novo','pago','enviado','concluido','cancelado'];

  constructor(private ordersSrv: OrdersService) {
    this.ordersSrv.orders$.subscribe(list => this.orders = list);
  }

  changeStatus(o: Order, s: OrderStatus) {
    this.ordersSrv.updateStatus(o.id, s);
  }
}
