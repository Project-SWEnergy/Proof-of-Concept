import { Injectable } from '@angular/core';
import { Dish } from '../interfaces/dish';
import axios from './../../../axios-config';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDetailsService {

  urlDishes = '/utenti/piatti';


  async getAllDishesByRestaurantId(id: number): Promise<Dish[]> {
    return axios.get(this.urlDishes + '/' + id.toString())
        .then(response => {
          console.log("Response data: " + response.data);
          return response.data;
        }).catch(err => { 
          console.log("Connection error")
          return [];
        })

  }

  /*async getDishById(id: number): Promise<Dish | undefined> {
    const data = await fetch(`${this.urlDishes}/${id}`);
    return await data.json() ?? {};
  }*/


  constructor() { }
}
