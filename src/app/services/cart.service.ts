import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

interface CartItem extends Product {
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>([]);

  addToCart(product: Product, quantity: number, price: number) {
    const existingItem = this.cart().find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = price;
      this.cart.set([...this.cart()]);
    } else {
      this.cart.set([...this.cart(), { ...product, quantity, price }]);
    }
  }

  constructor() {}
}
