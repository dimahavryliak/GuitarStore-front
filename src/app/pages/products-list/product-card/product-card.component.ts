import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [PrimaryButtonComponent, FormsModule],
  template: `
    <div
      class="bg-white border rounded-xl p-6 shadow-md flex flex-col min-h-[450px]"
    >
      <div class="flex justify-center">
        <img
          [src]="product().image"
          class="w-[200px] h-[200px] object-contain"
        />
      </div>

      <div class="flex flex-col flex-1 mt-4">
        <span class="text-lg font-bold">{{ product().name }}</span>
        <span class="text-sm">
          {{ truncateDescription(product().description, 95) }}
        </span>

        <span class="text-md text-red-600 text-lg">
          {{ '$' + getPrice() + '/pcs' }}
        </span>

        <div class="mt-auto pt-4 flex items-center space-x-2">
          <input
            type="number"
            class="border rounded-xl p-1 w-16 text-center"
            [(ngModel)]="quantity"
            min="1"
          />
          <div class="w-full">
            <app-primary-button
              label="Add to Cart"
              (btnClicked)="addToCart()"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  cartService = inject(CartService);

  product = input.required<Product>();
  quantity: number = 1;

  getPrice(): number {
    return this.quantity >= 3
      ? this.product().wholesalePrice
      : this.product().retailPrice;
  }

  addToCart() {
    const price = this.getPrice();
    this.cartService.addToCart(this.product(), this.quantity, price);
  }

  truncateDescription(description: string, maxLength: number): string {
    return description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;
  }
}
