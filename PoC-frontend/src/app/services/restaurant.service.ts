import { Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import axios from './../../../axios-config'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private urlRestaurants = '/utenti/ristoranti';
  private url = '/restaurants';

  constructor() {}

  async getAllRestaurants(): Promise<Restaurant[]> {
    return axios.get(this.urlRestaurants)
    .then(response => {
      console.log("Response data:" + response.data);
      return response.data;
    }).catch(err => { 
      console.log("Connection error")
      return []
    })
  }

  async getRestaurantById(id: number): Promise<Restaurant | null> {
    return axios.get(this.urlRestaurants + '/' + id.toString())
      .then(response => {
        console.log("Response data:" + response.data);
        return response.data;
      }).catch(err => { 
        console.log("Connection error")
        return null
      })
  }

  async getRestaurantsByTags(tags: string[]): Promise<Restaurant[]> {
    const tagsQueryParam = tags.join(',');
    const data = await fetch(`${this.url}?tags=${tagsQueryParam}`);
    return await data.json() ?? [];
  }
}