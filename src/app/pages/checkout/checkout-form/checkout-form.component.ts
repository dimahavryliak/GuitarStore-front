import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BuyerService } from '../../../services/buyer.service';
import { DealService } from '../../../services/deal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="flex items-center justify-center p-4">
      <form
        [formGroup]="checkoutForm"
        (ngSubmit)="onSubmit()"
        class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <div class="mb-4">
          <label
            for="phoneNumber"
            class="block text-sm font-medium text-gray-700"
            >Phone Number:</label
          >
          <input
            id="phoneNumber"
            formControlName="phoneNumber"
            type="number"
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label
            for="contactPerson"
            class="block text-sm font-medium text-gray-700"
            >Contact Person:</label
          >
          <input
            id="contactPerson"
            formControlName="contactPerson"
            type="text"
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700"
            >Address:</label
          >
          <input
            id="address"
            formControlName="address"
            type="text"
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          [disabled]="checkoutForm.invalid"
          class="w-full bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm: FormGroup;
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private buyerService: BuyerService,
    private dealService: DealService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.checkoutForm = this.fb.group({
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
      ],
      contactPerson: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.orderService.getTotalPrice().subscribe((price) => {
      this.totalPrice = price;
      console.log(this.totalPrice); // Debug log to check the price
    });
  }

  async onSubmit() {
    if (this.checkoutForm.valid) {
      try {
        const buyerData = {
          phone: this.checkoutForm.value.phoneNumber,
          contactPerson: this.checkoutForm.value.contactPerson,
          address: this.checkoutForm.value.address,
        };
        const createdBuyer = await this.buyerService.createBuyer(buyerData);

        const dealData = {
          dateOfDeal: new Date().toISOString().split('T')[0],
          products: this.cartService.cart().map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.quantity >= 3 ? item.wholesalePrice : item.retailPrice,
          })),
          buyer: {
            phone: createdBuyer.phone,
            contactPerson: createdBuyer.contactPerson,
            address: createdBuyer.address,
          },
          price: this.totalPrice,
        };
        await this.dealService.createDeal(dealData);

        this.cartService.clearCart();

        this.snackBar.open('Order successfully created!', 'Close', {
          duration: 3000,
          panelClass: 'success-toast',
        });

        this.checkoutForm.reset();

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      } catch (error) {
        console.error('Error creating buyer or deal:', error);

        this.snackBar.open('Failed to create order. Try again!', 'Close', {
          duration: 3000,
          panelClass: 'error-toast',
        });
      }
    }
  }
}
