import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../../../core/services/products.service';
import { CartService } from '../../../../core/services/cart.service';
import { ToastService } from '../../toast/toast.service';


@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
  product: Product | null = null;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private toastService: ToastService 
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.product = this.productsService.bySlug(slug);
    }
  }

  addToCart() {
    if (!this.product) return;

    this.cartService.addToCart({
      slug: this.product.slug,
      title: this.product.title,
      price: this.product.price,
      img: this.product.img
    });

    this.toastService.show(`${this.qty}x "${this.product.title}" adicionado ao carrinho!`, 'success');
  }
}