import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, MatSnackBarModule],
  template: `<app-header /> <router-outlet /> `,
  styles: [],
})
export class AppComponent {
  title = 'frontend';
}
