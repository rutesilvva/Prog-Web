import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  title: string;
  slug: string;
  price: number;
  img: string;
  category: string;
}

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  searchTerm = '';
  selectedCategory = '';

  categories = [
    { label: 'IA e Aprendizado de Máquina', code: 'ia-ml' },
    { label: 'Ciência de Dados', code: 'data' },
    { label: 'Programação', code: 'prog' },
    { label: 'DevOps e Nuvem', code: 'devops' },
    { label: 'Redes e Segurança', code: 'netsec' },
    { label: 'Sistemas e Arquitetura', code: 'arch' },
    { label: 'Banco de Dados', code: 'db' }
  ];

  products: Product[] = [
    { title: 'Kubernetes para desenvolvedores', slug: 'kubernetes-dev', price: 120, img: 'https://m.media-amazon.com/images/I/61EAJDHqiDL._UF894,1000_QL80_.jpg', category: 'devops' },
    { title: 'Redes Linux Avançadas', slug: 'redes-linux', price: 89, img: '/assets/prod/linux-network.png', category: 'netsec' },
    { title: 'Arquitetura de Software Moderna', slug: 'arquitetura-moderna', price: 99, img: '/assets/prod/arch-modern.png', category: 'arch' },
    { title: 'Aprendizado de Máquina Essencial', slug: 'ml-essencial', price: 79, img: '/assets/prod/ml.png', category: 'ia-ml' },
    { title: 'TypeScript Completo', slug: 'typescript', price: 110, img: '/assets/prod/typescript.png', category: 'prog' }
  ];

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      (!this.searchTerm || p.title.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || p.category === this.selectedCategory)
    );
  }
}
