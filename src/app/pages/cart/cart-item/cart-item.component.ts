import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/products.model';

@Component({
  selector: 'app-cart-item',
  template: `
    <div class="bg-white shadow-md rounded-xl p-3 flex gap-4 items-centered">
      <img [src]="item.image" class="w-[150px] h-[150px] object-contain" />
      <div class="flex flex-col justify-between">
        <span class="text-md font-bold mb-5">{{ item.name }}</span>
        <span class="text-sm">{{ item.description }}</span>
        <div class="mt-5">
          <span class="text-md font-bold">
            {{
              (item.quantity >= 3
                ? item.wholesalePrice * item.quantity
                : item.retailPrice * item.quantity) +
                '$' +
                ' for ' +
                item.quantity +
                ' piece' +
                (item.quantity > 1 ? 's' : '')
            }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CartItemComponent implements OnInit {
  @Input() item!: Product;

  ngOnInit(): void {
    console.log('Cart item:', this.item);
  }
}
