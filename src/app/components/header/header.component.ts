import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div
      class="bg-[#0F0F0F] text-white px-8 py-3  flex justify-between items-center"
    >
      <button class="text-xl" routerLink="/">Tech store</button>
      <app-primary-button
        [label]="'Cart(' + cartService.cart().length + ')'"
        routerLink="/cart"
      />
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
