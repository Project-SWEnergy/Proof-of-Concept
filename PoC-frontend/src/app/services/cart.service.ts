import { Injectable } from "@angular/core";
import { Dish } from "../interfaces/dish";
import { Reservation } from "../interfaces/reservations";
import { Ordinazione } from "../interfaces/ordinazione";
import { PiattoOrdinato } from "../interfaces/ordinazione";
import axios from './../../../axios-config'



@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:3000/dishes';
  urlPrenotazioni = '/prenotazioni';

  /*async getAllDishes(): Promise<Dish[]> {
    const dishes = await fetch(this.url);
    return await dishes.json() ?? [];
  }*/

  /*async getDishById(id: number): Promise<Dish | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }*/

  cart: any[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  addToCart(dish: any): void {
    const existingIndex = this.cart.findIndex(item => item.id === dish.id);
    if (existingIndex !== -1) {
      this.cart[existingIndex].quantity++;
    } else {
      dish.quantity = 1;
      this.cart.push(dish);
    }
    this.saveCartToLocalStorage();
  }

  removeFromCart(dish: any): void {
    const existingIndex = this.cart.findIndex(item => item.id === dish.id);
    if (existingIndex !== -1) {
      if (this.cart[existingIndex].quantity > 1) {
        this.cart[existingIndex].quantity--;
      } else {
        this.cart.splice(existingIndex, 1);
      }
      this.saveCartToLocalStorage();
    }
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];
    this.saveCartToLocalStorage();
  }

  getCart(): any[] {
    return this.cart;
  }


  
  //TODO: oggetto di tipo Reservation, oggetto di tipo Ordinazione.
  async Prenota(prenotazione: Reservation): Promise<void> {
    await axios.post(this.urlPrenotazioni, prenotazione)
    .then(response => {
      console.log("Response data:" + response.data);
    }).catch(err => { 
      console.log("Connection error")
    })
  }


}