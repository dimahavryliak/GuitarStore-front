import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DealService } from '../../services/deal.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styles: [],
})
export class AdminDashboardComponent implements OnInit {
  authService = inject(AuthService);
  dealService = inject(DealService);
  router = inject(Router);
  isEmployee$: Observable<boolean>;
  deals: any[] = [];

  constructor() {
    this.isEmployee$ = this.authService
      .getIsEmployee()
      .pipe(filter((isEmployee): isEmployee is boolean => isEmployee !== null));
  }

  ngOnInit() {
    this.isEmployee$.subscribe((isEmployee) => {
      if (!isEmployee) {
        this.router.navigate(['/']);
      } else {
        this.loadData();
      }
    });
  }

  async loadData() {
    try {
      this.deals = await this.dealService.getDeals();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
