import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="p-4 sm:p-6 md:p-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        @for (product of products; track product._id) {
        <app-product-card [product]="product" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    try {
      const data = await this.productService.getProducts();
      this.products = data as Product[];
    } catch (error) {
      console.error('Fetching products failed:', error);
      this.products = [];
    }
  }
}
