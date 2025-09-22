import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';


interface HeroSlide {
  eyebrow: string;
  title: string;
  desc: string;
  priceBadge?: string;
  ctaText: string;
  ctaLink: string;
  img: string;
  alt: string;
}

interface Product {
  title: string;
  slug: string;
  price: number;
  img: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  year = new Date().getFullYear();
    constructor(private cartService: CartService) {}


  slides: HeroSlide[] = [
    {
      eyebrow: 'Aprenda IA na prática',
      title: 'Box Machine Learning Essencial',
      desc: 'Conceitos, pipelines e MLOps. Ganhe um e-book bônus em compras acima de R$ 149.',
      priceBadge: 'R$ 99',
      ctaText: 'VER BOX',
      ctaLink: '/catalog',
      img: 'https://m.media-amazon.com/images/I/814TXmfTKLL._UF1000,1000_QL80_.jpg',
      alt: 'Livros de IA e Machine Learning'
    },
    {
      eyebrow: 'Programação moderna',
      title: 'TypeScript + Angular para produção',
      desc: 'Arquitetura, padrões e testes end-to-end para projetos escaláveis.',
      ctaText: 'PROGRAMAR AGORA',
      ctaLink: '/catalog',
      img: 'https://m.media-amazon.com/images/I/71aMLMZWutL._UF894,1000_QL80_.jpg',
      alt: 'Livro de TypeScript e Angular'
    },
    {
      eyebrow: 'Infra e nuvem',
      title: 'DevOps & Kubernetes',
      desc: 'CI/CD, observabilidade e boas práticas de containers em cloud.',
      priceBadge: 'R$ 120',
      ctaText: 'EXPLORAR TÍTULOS',
      ctaLink: '/catalog',
      img: 'https://m.media-amazon.com/images/I/812I44qv8DL._UF1000,1000_QL80_.jpg',
      alt: 'Livros de DevOps e Kubernetes'
    }
  ];
  current = 0;
  private timer?: number;

  catOpen = false;
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
    { title: 'Kubernetes para desenvolvedores', slug: 'kubernetes-dev', price: 120, img: 'https://m.media-amazon.com/images/I/61EAJDHqiDL._UF894,1000_QL80_.jpg' },
    { title: 'Redes Linux Avançadas', slug: 'redes-linux', price: 89, img: 'https://imagens.disal.com.br/produtos/ampliada/1191128.jpg' },
    { title: 'Arquitetura de Software Moderna', slug: 'arquitetura-moderna', price: 99, img: 'https://m.media-amazon.com/images/I/81ZE1M+bueL._UF1000,1000_QL80_.jpg' },
    { title: 'Aprendizado de Máquina Essencial', slug: 'ml-essencial', price: 79, img: 'https://m.media-amazon.com/images/I/616DP2PnANL._UF1000,1000_QL80_.jpg' },
    { title: 'TypeScript Completo', slug: 'typescript', price: 110, img: 'https://www.casadocodigo.com.br/cdn/shop/products/p_801e56cc-890d-4709-8dee-76288fc53c49_large.jpg?v=1627678101' }
  ];
  prodIndex = 0;

  ngOnInit(): void {
    this.timer = window.setInterval(() => this.nextHero(), 6000);
  }

  ngOnDestroy(): void {
    if (this.timer) window.clearInterval(this.timer);
  }

  nextHero(): void {
    this.current = (this.current + 1) % this.slides.length;
  }
  goToHero(i: number): void {
    this.current = i;
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = window.setInterval(() => this.nextHero(), 6000);
    }
  }

  closeCats() { 
    this.catOpen = false; }

  nextProducts() {
    this.prodIndex = (this.prodIndex + 1) % this.products.length;
  }
  prevProducts() {
    this.prodIndex = (this.prodIndex - 1 + this.products.length) % this.products.length;
  }

  addToCart(p: any) {
  this.cartService.addToCart(p);
  // feedback simples
  // (use um snackbar/toast se quiser)
  alert(`${p.title} foi adicionado ao carrinho!`);
}
}
