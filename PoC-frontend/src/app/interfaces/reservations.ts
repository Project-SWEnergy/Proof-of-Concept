import { Dish } from "./dish"

export interface Reservation {
    id: number,
    username: string,
    restaurantId: number,
    restaurantName: string, 
    date: Date,
    seats: number,
    status: reservation_status,
    kids: number,
    disabled: boolean,
    dishes : PiattoOrdinato[]
}

export enum reservation_status{
	da_confermare = "Da confermare",
	rifiutato = "Rifiutato", 
	annullato = "Annullato",
	in_attesa = "In attesa",
	in_corso = "In corso",
	concluso = "Concluso",
}

export const RESERVATION_STATUS_VALUES = Object.values(reservation_status);

export interface PiattoOrdinato {
    dish: Dish,
    quantity: number
}