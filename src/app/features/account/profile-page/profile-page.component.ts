import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../../core/services/auth.service';

import { OrdersService, Order } from '../../../core/services/orders.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: User | null = null;
  orders: Order[] = [];
  private sub?: Subscription;

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe(u => {
      this.user = u;
      if (u) {
        this.ordersService.orders$.subscribe(all => {
          this.orders = all.filter(o => o.customer?.email === u.email);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
