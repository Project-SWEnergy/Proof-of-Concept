import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { Reservation } from '../../../interfaces/reservations';
import { ReservationManagerService } from '../../../services/reservation-manager.service';
import { ShareDataService } from '../../../services/share-data.service';

@Component({
  selector: 'app-compact-booking-boxes',
  standalone: true,
  imports: [
    ReservationCardComponent,
    CommonModule
  ],
  templateUrl: './compact-booking-boxes.component.html',
  styleUrl: './compact-booking-boxes.component.css'
})
export class CompactBookingBoxesComponent {
  reservationManagerService: ReservationManagerService = inject(ReservationManagerService);
  shareDataService: ShareDataService = inject(ShareDataService);

  reservationsList: Reservation[] = [];
  selectedDate: Date = new Date();

  ngOnInit() {
    this.reservationManagerService.update$.subscribe(() => {
      // Chiamata alla tua logica di aggiornamento quando ricevi una notifica
      this.refreshData();
    });

    this.shareDataService.selectedDate$.subscribe((date) => {
      if (date) {
        this.selectedDate = date;
        this.reservationManagerService.getAllReservationsWithDate(this.selectedDate)
          .then(
            reservations => {
              this.reservationsList = reservations;
            }
          )
      }
      else {
        console.log("Data fornita non valida");
      }
    });
  }


  private refreshData() {
    this.reservationManagerService.getAllReservationsWithDate(this.selectedDate).then(
      reservations => {
        this.reservationsList = reservations;
      }
    );
  }
  
  constructor() {
    this.reservationManagerService.getAllReservationsWithDate(new Date()).then(
      reservations => {
        this.reservationsList = reservations;
      }
    )
  }
}
