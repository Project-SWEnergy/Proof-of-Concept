import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideshowComponent } from './components/client-homepage/slideshow/slideshow.component';
import { ReservationConfirmationComponent } from './components/client-homepage/reservation-confirmation/reservation-confirmation.component';
import { MenuComponent } from './components/client-homepage/menu/menu.component';
import { OrderListComponent } from './components/client-homepage/order-list/order-list.component';
import { ClientHomeComponent } from './components/client-homepage/client-home/client-home.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login-page/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
		RouterModule,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ClientHomeComponent,
    SlideshowComponent,
    ReservationConfirmationComponent,
    MenuComponent,
    OrderListComponent      
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'PoC-frontend';
}
