import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:5000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  constructor(private cartService: CartService) {}

  async register(userData: any) {
    try {
      const response = await axios.post(
        `${this.API_URL}/auth/register`,
        userData
      );
      this.isAuthenticatedSubject.next(true);
      this.usernameSubject.next(userData.username);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(userData: any) {
    try {
      const response = await axios.post(`${this.API_URL}/auth/login`, userData);
      this.isAuthenticatedSubject.next(true);
      this.usernameSubject.next(userData.username);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next(null);
    this.cartService.clearCart();
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }
}
