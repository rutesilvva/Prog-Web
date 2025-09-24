import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  catOpen = false;

  // observables para o template
  user$: typeof this.auth.user$;
  totalQty$: any;

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
  ) {
    this.user$ = this.auth.user$;
    this.totalQty$ = this.cart.cartItems.pipe(
      map(items => items.reduce((sum, i) => sum + i.quantity, 0))
    );
  }

  logout() {
    this.auth.logout();           
    this.router.navigate(['/home']);
  }

  closeCats() {
  this.catOpen = false;
}
}
