import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  catOpen = false;
  user: User | null = null;
  sub?: Subscription;
  totalQty = 0;

  categories = [
    { label: 'IA e Machine Learning', code: 'ia-ml' },
    { label: 'Ciência de Dados', code: 'data' },
    { label: 'Programação', code: 'prog' },
    { label: 'DevOps e Nuvem', code: 'devops' },
    { label: 'Redes e Segurança', code: 'netsec' },
    { label: 'Sistemas e Arquitetura', code: 'arch' },
    { label: 'Banco de Dados', code: 'db' }
  ];

  constructor(
    private auth: AuthService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe(u => this.user = u);
    this.cart.cartItems.subscribe(items => {
      this.totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  closeCats() {
    this.catOpen = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
