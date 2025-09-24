import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../core/services/cart.service';
import { ToastService } from '../../toast/toast.service';

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
  constructor(private cart: CartService, private toast: ToastService) {}



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
    { title: 'Redes Linux Avançadas', slug: 'redes-linux', price: 89, img: 'https://imagens.disal.com.br/produtos/ampliada/1191128.jpg', category: 'netsec' },
    { title: 'Arquitetura de Software Moderna', slug: 'arquitetura-moderna', price: 99, img: 'https://m.media-amazon.com/images/I/81ZE1M+bueL._UF1000,1000_QL80_.jpg', category: 'arch' },
    { title: 'Aprendizado de Máquina Essencial', slug: 'ml-essencial', price: 79, img: 'https://m.media-amazon.com/images/I/814TXmfTKLL._UF1000,1000_QL80_.jpg', category: 'ia-ml' },
    { title: 'TypeScript Completo', slug: 'typescript', price: 110, img: 'https://www.casadocodigo.com.br/cdn/shop/products/p_801e56cc-890d-4709-8dee-76288fc53c49_large.jpg?v=1627678101', category: 'prog' }
  ];

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      (!this.searchTerm || p.title.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || p.category === this.selectedCategory)
    );
  }


addToCart(p: Product) {
  this.cart.addToCart({ slug: p.slug, title: p.title, price: p.price, img: p.img });
  this.toast.show(`${p.title} foi adicionado ao carrinho!`, 'success', 2500);
}
}
