import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;

  orders = [
    { id: '1234', date: '12/09/2025', total: 199.90, status: 'Entregue' },
    { id: '5678', date: '01/09/2025', total: 89.90, status: 'Em andamento' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user; // pega o usuário atual logado
  }
}
