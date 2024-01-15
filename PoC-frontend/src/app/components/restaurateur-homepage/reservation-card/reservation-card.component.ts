import { Component, Input, inject } from '@angular/core';
import { Reservation } from '../../../interfaces/reservations';
import { formatDate } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ShareDataService } from '../../../services/share-data.service';


@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.css'
})
export class ReservationCardComponent {
  @Input() reservation!: Reservation;

  shareDataService: ShareDataService = inject(ShareDataService);

  date: string = '';
  time: string = '';

  ngOnInit() {
    if (this.reservation && this.reservation.date) {
      this.date = formatDate(this.reservation.date, 'shortDate', 'it');
      this.time = formatDate(this.reservation.date, 'HH:mm:ss', 'it');
    }
  }

  showDetails(): void{
    this.shareDataService.reservationSelected = this.reservation;
  }
}
