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
      class="group bg-white border rounded-xl p-4 sm:p-5 shadow-md flex flex-col min-h-[380px] md:min-h-[420px] 
  transition-all duration-300 transform relative hover:scale-105 hover:w-[330px] sm:hover:w-[380px] hover:z-10"
    >
      <div class="flex justify-center">
        <img
          [src]="product().image"
          class="w-[130px] h-[130px] sm:w-[180px] sm:h-[180px] object-contain"
          alt="Product Image"
        />
      </div>

      <div class="flex flex-col flex-1 mt-3">
        <span class="text-sm sm:text-base font-bold text-gray-800 text-center">
          {{ product().name }}
        </span>

        <!-- Shorter Description -->
        <span
          class="text-xs sm:text-sm text-gray-600 text-center mt-2 transition-all duration-300 line-clamp-2 group-hover:line-clamp-none"
        >
          {{ product().description }}
        </span>

        <span
          class="text-sm sm:text-md text-red-600 font-semibold text-center mt-2"
        >
          {{ '$' + getPrice() + '/pcs' }}
        </span>

        <div class="mt-auto pt-3 flex items-center justify-center gap-2">
          <input
            type="number"
            class="border rounded-xl p-1 w-14 text-center"
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
}
