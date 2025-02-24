import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  private API_URL = 'http://localhost:5000/api';

  async createDeal(dealData: any) {
    try {
      const response = await axios.post(`${this.API_URL}/deals`, dealData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
