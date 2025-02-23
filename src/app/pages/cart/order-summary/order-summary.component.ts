import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-xl">Order summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Total:</span>
          <span class="font-bold">{{ '$' + total() }}</span>
        </div>
        <app-primary-button label="Checkout" routerLink="/checkout" />
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      total +=
        item.quantity >= 3
          ? item.wholesalePrice * item.quantity
          : item.retailPrice * item.quantity;
    }
    return total;
  });
}
