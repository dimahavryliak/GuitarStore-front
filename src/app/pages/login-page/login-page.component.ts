import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Log In</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input
              type="email"
              formControlName="email"
              class="w-full p-2 border rounded"
            />
            <small *ngIf="isControlInvalid('email')" class="text-red-500">
              Valid email is required
            </small>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Password</label>
            <input
              type="password"
              formControlName="password"
              class="w-full p-2 border rounded"
            />
            <small *ngIf="isControlInvalid('password')" class="text-red-500">
              Password is required
            </small>
          </div>

          <button
            type="submit"
            class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
            [disabled]="loginForm.invalid"
          >
            Log In
          </button>
        </form>

        <p *ngIf="message" class="mt-4 text-center text-green-500">
          {{ message }}
        </p>
        <p *ngIf="errorMessage" class="mt-4 text-center text-red-500">
          {{ errorMessage }}
        </p>

        <div class="mt-4 text-center">
          <p class="text-gray-700">Don't have an account?</p>
          <button
            class="text-blue-500 hover:underline mt-2"
            (click)="navigateToSignup()"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  async onSubmit() {
    console.log('Login Form Submitted', this.loginForm.value);
    if (this.loginForm.valid) {
      try {
        console.log('Form is valid, logging in...');
        await this.authService.login(this.loginForm.value);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error during login', error);
        this.errorMessage = 'Invalid email or password!';
        this.message = '';
      }
    } else {
      console.log('Form is invalid');
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
