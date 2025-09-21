import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

import { AuthService,User } from '../../core/services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  catOpen = false;
  totalQty = 0;
  user: User | null = null;

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
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems.subscribe(items => {
      this.totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    });

    this.authService.user$.subscribe(u => {
      this.user = u;
    });
  }

  closeCats() {
    this.catOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
