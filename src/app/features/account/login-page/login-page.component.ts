import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Preencha todos os campos!';
      return;
    }

    // Aqui você pode criar validações simples
    if (this.email.includes('admin')) {
      this.authService.loginAs('admin', 'Administrador', this.email);
    } else {
      this.authService.loginAs('customer', 'Cliente', this.email);
    }

    // Redireciona para a página de conta
    this.router.navigate(['/account']);
  }
}
