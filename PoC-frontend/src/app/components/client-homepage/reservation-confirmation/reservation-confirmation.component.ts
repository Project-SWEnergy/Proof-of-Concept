import { Component, Input } from '@angular/core';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../../services/cart.service';
import { Reservation, reservation_status } from '../../../interfaces/reservations';
import { Ordinazione, PiattoOrdinato } from '../../../interfaces/ordinazione';
import { Dish } from '../../../interfaces/dish';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reservation-confirmation',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatRadioModule, MatCheckboxModule, MatCardModule,NgIf],
  templateUrl: './reservation-confirmation.component.html',
  styleUrl: './reservation-confirmation.component.css'
})
export class ReservationConfirmationComponent {
  @Input() restaurantId: number;
  colorControl = new FormControl('warn' as ThemePalette);
  numeroPersone: string = "0";
  numeroSeggioloni: string = "0";
  selectedDate: Date | undefined;
  checked = false;
  errorNumeroPersone: boolean = false;
  errorNumeroSeggioloni: boolean = false;

  isPrenotaButtonEnabled: boolean = false;

  constructor(private cartService: CartService) { }
  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.updatePrenotaButtonState();
  }


  //TODO: Fixare controllo per numero seggioloni

  checkInput(field: string): void {
    if (field === 'numeroPersone') {
      this.errorNumeroPersone = Number(this.numeroPersone) < 0;
    } else if (field === 'numeroSeggioloni') {
      this.errorNumeroSeggioloni = Number(this.numeroSeggioloni) < 0;
    }

    this.updatePrenotaButtonState();
  }

  prenota(): void {
    // Creazione dell'oggetto Ordinazione utilizzando il CartService
    const dishesInCart: PiattoOrdinato[] = this.cartService.getCart().map((item: any) => {
      const dish: Dish = {
        id: item.id,
        restaurantId: item.restaurantId,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        ingredients: item.ingredients
      };

      return {
        dish,
        quantity: item.quantity
      };
    });


    const newReservation: Reservation = {
      id: 1,
      username: "cliente",
      restaurantId: this.restaurantId,
      restaurantName: "",
      date: this.selectedDate ?? new Date(),
      seats: Number(this.numeroPersone) ?? 0,
      status: reservation_status.da_confermare,
      kids: Number(this.numeroSeggioloni) ?? 0,
      disabled: this.checked,
      dishes: dishesInCart
    };



    // Utilizzo del servizio CartService per eseguire la routine
    this.cartService.Prenota(newReservation);

  }
  updatePrenotaButtonState(): void {
    this.isPrenotaButtonEnabled = Number(this.numeroPersone) > 0 && 
                                  this.selectedDate !== undefined && 
                                  Number(this.numeroSeggioloni) >= 0;
  }


}