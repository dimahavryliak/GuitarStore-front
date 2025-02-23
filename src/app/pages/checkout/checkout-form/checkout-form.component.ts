import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex items-center justify-center  p-4">
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
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          [disabled]="checkoutForm.invalid"
          class="w-full bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class CheckoutFormComponent {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
      ],
      contactPerson: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
    }
  }
}
