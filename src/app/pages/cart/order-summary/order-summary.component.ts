import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent, RouterLink, CommonModule],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-xl">Order summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <span class="text-lg">Total:</span>
          <span class="font-bold">{{ '$' + totalWithDiscount() }}</span>
        </div>
        <div *ngIf="discount() > 0" class="text-green-600">
          <span class="text-lg">Discount:</span>
          <span class="font-bold">{{ '$' + discount() }}</span>
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

  totalQuantity = computed(() => {
    let totalQuantity = 0;
    for (const item of this.cartService.cart()) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  });

  discount = computed(() => {
    const total = this.total();
    const totalQuantity = this.totalQuantity();
    if (total > 1000 || totalQuantity > 10) {
      return total * 0.1;
    }
    return 0;
  });

  totalWithDiscount = computed(() => {
    return this.total() - this.discount();
  });
}
