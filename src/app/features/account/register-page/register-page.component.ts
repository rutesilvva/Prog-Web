import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Preencha todos os campos!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'As senhas não conferem!';
      return;
    }

    // protótipo: apenas exibe no console
    console.log('Novo usuário:', {
      name: this.name,
      email: this.email,
      password: this.password
    });

    // simula sucesso → redireciona para conta
    this.router.navigate(['/account']);
  }
}
