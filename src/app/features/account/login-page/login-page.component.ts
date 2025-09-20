import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Preencha todos os campos!';
      return;
    }

    // protótipo: apenas loga no console
    console.log('Login com:', this.email, this.password);

    // simula sucesso → redireciona para conta
    this.router.navigate(['/account']);
  }
}
