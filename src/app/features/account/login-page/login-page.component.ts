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
  name = '';
  email = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      this.errorMsg = 'Preencha todos os campos!';
      return;
    }
    const role = this.email.includes('admin') ? 'admin' : 'customer';
    this.authService.loginAs(role, this.name, this.email);
    this.router.navigate(['/account']);
  }
}
