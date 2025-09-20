import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../../core/services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent {
  products: Product[] = [];
  editing?: Product;

  // form (add/edit)
  f: Partial<Product> = { title:'', slug:'', price:0, img:'', digital:false, downloadUrl:'' };

  constructor(private ps: ProductsService) {
    this.ps.items$.subscribe(list => this.products = list);
  }

  resetForm() { this.f = { title:'', slug:'', price:0, img:'', digital:false, downloadUrl:'' }; this.editing = undefined; }

  edit(p: Product) {
    this.editing = p;
    this.f = { ...p };
  }

  save() {
    if (!this.f.title || !this.f.slug || !this.f.price) return;
    if (this.editing) {
      this.ps.update(this.editing.id, this.f);
    } else {
      this.ps.add(this.f as any);
    }
    this.resetForm();
  }

  remove(p: Product) {
    if (confirm(`Remover "${p.title}"?`)) this.ps.remove(p.id);
  }
}
