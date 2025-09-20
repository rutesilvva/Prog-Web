import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  user = {
    name: 'João da Silva',
    email: 'joao.silva@example.com',
    phone: '(83) 99999-8888'
  };

  orders = [
    { id: '1234', date: '12/09/2025', total: 199.90, status: 'Entregue' },
    { id: '5678', date: '01/09/2025', total: 89.90, status: 'Em andamento' }
  ];
}
