import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservations';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  // Gestione selezione di una prenotazione per visualizzarne i dettagli
  private _reservationSelected: Reservation;
  public get reservationSelected(): Reservation{
    return this._reservationSelected;
  }
  public set reservationSelected(value: Reservation) {
    this._reservationSelected = value;
    this.reservationSelectedSubject.next(value);
  }
  private reservationSelectedSubject = new BehaviorSubject<Reservation | null>(null);
  reservationSelected$ = this.reservationSelectedSubject.asObservable();



  public showSeparatedBookingBoxes: boolean = false;

  
  public formattedDate: string = '';
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();
  setSelectedDate(date: Date) {
    this.selectedDateSubject.next(date);
  }


  constructor() { }
}
