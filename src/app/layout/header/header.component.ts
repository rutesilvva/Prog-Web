import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  catOpen = false;

  categories = [
    { label: 'IA e Machine Learning', code: 'ia-ml' },
    { label: 'Ciência de Dados', code: 'data' },
    { label: 'Programação', code: 'prog' },
    { label: 'DevOps e Nuvem', code: 'devops' },
    { label: 'Redes e Segurança', code: 'netsec' },
    { label: 'Sistemas e Arquitetura', code: 'arch' },
    { label: 'Banco de Dados', code: 'db' }
  ];

  closeCats() {
    this.catOpen = false;
  }
}
