import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from '../../models/products.model'; // Import the Product interface

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div
      class="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      @for (product of products; track product._id) {
      <app-product-card [product]="product" />
      }
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
