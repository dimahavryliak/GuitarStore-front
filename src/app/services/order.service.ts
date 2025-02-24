import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private totalPriceSubject = new BehaviorSubject<number>(0);

  setTotalPrice(price: number) {
    this.totalPriceSubject.next(price);
  }

  getTotalPrice() {
    return this.totalPriceSubject.asObservable();
  }
}
