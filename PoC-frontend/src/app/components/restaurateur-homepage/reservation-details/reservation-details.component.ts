import { Component, Input, OnInit, inject } from '@angular/core';
import { Reservation } from '../../../interfaces/reservations';
import { Subscription } from 'rxjs';
import { ShareDataService } from '../../../services/share-data.service';
import { CommonModule, formatDate } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { RESERVATION_STATUS_VALUES } from '../../../interfaces/reservations';
import { PiattoOrdinato } from '../../../interfaces/reservations';
import { MatButtonModule } from '@angular/material/button';
import { ReservationManagerService } from '../../../services/reservation-manager.service';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css',
})
export class ReservationDetailsComponent implements OnInit {
  @Input() reservationSelected!: Reservation;
  modifiedReservation: Reservation;

  reservationStatusValues = RESERVATION_STATUS_VALUES;

  shareDataService: ShareDataService = inject(ShareDataService);
  reservationManagerService: ReservationManagerService = inject(ReservationManagerService);

  reservationForm: FormGroup;
  private subscription: Subscription;
  selectedDate: Date = new Date();

  ngOnInit() {
    this.subscription = this.shareDataService.reservationSelected$.subscribe(
      (reservation: Reservation | null) => {
        if (reservation !== null) {
          this.reservationSelected = reservation;
          this.updateForm(reservation);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.reservationForm = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      status: [null, Validators.required],
      seats: [null, [Validators.required, this.minValueSetter(0)]],
      kids: [null, [Validators.required, this.minValueSetter(0)]],
      disabled: [false],
    });
  }

  /**
   * Aggiorna i dati presenti nel form dopo aver selezionato un oggetto.
   * @param reservation Elemento selezionato che dovrà essere mostrato nel form.
   */
  updateForm(reservation: Reservation): void {
    var reservationTime: string = formatDate(reservation.date, 'HH:mm', 'it');
    if (reservation) {
      this.reservationForm.patchValue({
        date: reservation.date,
        time: reservationTime,
        status: reservation.status,
        seats: reservation.seats,
        kids: reservation.kids,
        disabled: reservation.disabled,
      });
    }
    const dateControl = this.reservationForm.get('date');
    if (dateControl) {
      this.selectedDate = reservation.date
      dateControl.setValue(new Date(this.selectedDate));
    }
    const timeControl = this.reservationForm.get('time');
    if (timeControl) {
      timeControl.setValue([reservationTime]);
    }
  }

  /**
   * Definisce la componente che descrive l'errore legato al minimo valore inseribile in un form.
   * @param minValue Minimo valore accettabile.
   * @returns Map contenente errori di validazione, il nome viene richiamato in html per individuare la presenza dell'errore.
   */
  private minValueSetter(minValue: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value < minValue) {
        return { minValue: { min: minValue, actual: value } };
      }

      return null;
    };
  }

  /**
   * Aggiorna l'oggetto contenente la data inserendovi l'ora della prenotazione, aggiorna i campi di Reservation estraendoli dal form ed effettua la richiesta di modifica in database.
   */
  onSubmit() {
    console.log("submit");
    const dateControl = this.reservationForm.get('date')?.value;
    const timeControl = this.reservationForm.get('time')?.value;
    const [newHours, newMinutes] = String(timeControl).split(':').map(Number);
    dateControl.setHours(newHours, newMinutes);

    if (dateControl !== null) {
      this.modifiedReservation = {
        id: this.reservationSelected.id,
        username: this.reservationSelected.username,
        restaurantId: this.reservationSelected.restaurantId,
        restaurantName: this.reservationSelected.restaurantName,
        date: new Date(dateControl),
        seats: this.reservationForm.get('seats')?.value,
        status: this.reservationForm.get('status')?.value,
        kids: this.reservationForm.get('kids')?.value,
        disabled: this.reservationForm.get('disabled')?.value,
        dishes: this.reservationSelected.dishes
      };
    }
    const isUpdated = this.reservationManagerService.updateReservation(this.modifiedReservation).then(_ => {
      this.reservationManagerService.triggerUpdate();
    });
  }

  constructor(private fb: FormBuilder) {
    this.createForm();

  }
}
