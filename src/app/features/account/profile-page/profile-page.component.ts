import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../../core/services/auth.service';

import { OrdersService, Order } from '../../../core/services/orders.service';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: User | null = null;
  orders: Order[] = [];
  sub?: Subscription;

  constructor(private auth: AuthService, private ordersSrv: OrdersService) {}

  ngOnInit(): void {
  this.sub = this.auth.user$.subscribe(u => {
    this.user = u;
    if (u) {
      this.ordersSrv.orders$.subscribe(all => {
        this.orders = all.filter(o => o.customer.email === u.email);
      });
    } else {
      this.orders = [];
    }
  });
}

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}