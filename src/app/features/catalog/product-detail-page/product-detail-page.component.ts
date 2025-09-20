import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  title: string;
  price: number;
  description: string;
  img: string;
}

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent {
  product: Product = {
    title: 'Livro Angular Avançado',
    price: 129,
    description: 'Um guia completo sobre Angular moderno com práticas de mercado, arquitetura e testes.',
    img: '/assets/prod/angular.png'
  };

  qty = 1;

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');
    console.log('Produto carregado:', slug);
  }

  addToCart() {
    alert(`Adicionado ${this.qty}x "${this.product.title}" ao carrinho!`);
  }
}
