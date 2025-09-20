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
  name = '';       // novo campo
  email = '';
  password = '';
  errorMsg = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      this.errorMsg = 'Preencha todos os campos!';
      return;
    }

    // Armazena nome e email no AuthService
    if (this.email.includes('admin')) {
      this.authService.loginAs('admin', this.name, this.email);
    } else {
      this.authService.loginAs('customer', this.name, this.email);
    }

    this.router.navigate(['/account']);
  }
}
