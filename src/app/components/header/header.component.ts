import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  template: `
    <div
      class="bg-[#0F0F0F] text-white px-8 py-3  flex justify-between items-center"
    >
      <span class="text-xl">Tech store</span>
      <app-primary-button [label]="'Cart(' + cartService.cart().length + ')'" />
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  showButtonCLicked() {
    console.log('button clicked');
  }

  cartService = inject(CartService);
}
