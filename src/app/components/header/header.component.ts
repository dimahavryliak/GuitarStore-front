import { Component, inject, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, CommonModule],
  template: `
    <div
      class="bg-[#0F0F0F] text-white px-8 py-3 flex justify-between items-center"
    >
      <button class="text-xl" routerLink="/">Guitar store</button>
      <div class="flex space-x-4">
        <ng-container *ngIf="isAuthenticated$ | async; else signUp">
          <app-primary-button label="Logout" (btnClicked)="logout()" />
          <ng-container *ngIf="isEmployee$ | async">
            <app-primary-button label="Employee" routerLink="/admin" />
          </ng-container>
        </ng-container>
        <ng-template #signUp>
          <app-primary-button label="Sign Up" routerLink="/signup" />
        </ng-template>
        <app-primary-button
          [label]="'Cart(' + cartService.cart().length + ')'"
          routerLink="/cart"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderComponent implements OnInit {
  cartService = inject(CartService);
  authService = inject(AuthService);

  isAuthenticated$: Observable<boolean>;
  username$: Observable<string | null>;
  isEmployee$: Observable<boolean | null>;

  constructor() {
    this.isAuthenticated$ = this.authService.getAuthStatus();
    this.username$ = this.authService.getUsername();
    this.isEmployee$ = this.authService.getIsEmployee();
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
