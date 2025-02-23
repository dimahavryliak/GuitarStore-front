import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button
      (click)="btnClicked.emit()"
      class="primary-button bg-[#1D1D1D] w-full border px-5 py-2 rounded-xl shadow-md hover:opacity-80"
    >
      {{ label() }}
    </button>
  `,
  styles: [
    `
      .primary-button {
        color: white;
      }
    `,
  ],
})
export class PrimaryButtonComponent {
  label = input('');

  btnClicked = output();
}
