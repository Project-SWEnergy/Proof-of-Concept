import { Injectable } from '@angular/core';
import { Reservation, RESERVATION_STATUS_VALUES, reservation_status } from '../interfaces/reservations';
import { formatDate } from '@angular/common';
import axios from './../../../axios-config'
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ReservationManagerService {

  private urlReservations: string = '/ristoranti/prenotazioni';
  private day: any;


  private updateSubject = new Subject<void>();
  update$ = this.updateSubject.asObservable();
  triggerUpdate() {
    console.log("Triggered");
    this.updateSubject.next();
  }

  constructor() { }

  /**
   * @param {Date} date Data usata per filtrare l'elenco delle prenotazioni.
   * @returns {Promise<Reservation[]>} Array contenente le prenotazioni relative alla data specificata.
   */
  async getAllReservationsWithDate(date: Date): Promise<Reservation[]> {
    return axios.post(this.urlReservations, { date: date })
      .then(response => {
        this.day = Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(date)
        return response.data;
      })
      .catch(err => {
        console.log("Connection error")
        return []
      })
  }


  async updateReservation(reservation: Reservation): Promise<boolean> {
    console.log(reservation);
    return axios.patch(this.urlReservations + '/' + reservation.id.toString(), {
      reservationId: reservation.id,
      date: reservation.date,
      seats: reservation.seats,
      status: reservation.status,
      kids: reservation.kids,
      disabili: reservation.disabled
    })
      .then(response => {
        console.log(response.data);
        return true;
      })
      .catch(err => {
        console.log("Connection error")
        return false;
      })
  }
}
