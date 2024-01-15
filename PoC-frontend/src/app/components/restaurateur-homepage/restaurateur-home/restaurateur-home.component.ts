import { Component, inject, NgModule } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { SeparateBookingBoxesComponent } from '../separate-booking-boxes/separate-booking-boxes.component';
import { CompactBookingBoxesComponent } from '../compact-booking-boxes/compact-booking-boxes.component';
import { ShareDataService } from '../../../services/share-data.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ClockComponent } from '../clock/clock.component';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';


@Component({
  selector: 'app-restaurateur-home',
  standalone: true,
  imports: [
    FiltersComponent,
    SeparateBookingBoxesComponent,
    CompactBookingBoxesComponent,
    ClockComponent,
    CommonModule,
    ReservationDetailsComponent
  ],
  templateUrl: './restaurateur-home.component.html',
  styleUrl: './restaurateur-home.component.css'
})
export class RestaurateurHomeComponent {

  shareDataService: ShareDataService = inject(ShareDataService);

  constructor() { }
}
