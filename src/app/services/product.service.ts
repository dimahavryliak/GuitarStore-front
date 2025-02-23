import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private API_URL = 'http://localhost:5000/api/products';

  async getProducts() {
    try {
      const response = await axios.get(this.API_URL);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  }
}
