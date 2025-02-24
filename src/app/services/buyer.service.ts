import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  private API_URL = 'http://localhost:5000/api';

  async createBuyer(buyerData: any) {
    try {
      const response = await axios.post(`${this.API_URL}/buyers`, buyerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
