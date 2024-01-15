import { Component } from '@angular/core';
import { RestaurantsListComponent } from '../restaurants-list/restaurants-list.component';
import { SearchCityComponent } from '../search-city/search-city.component';
import { RestaurantTypesComponent } from '../restaurant-types/restaurant-types.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [RestaurantsListComponent,SearchCityComponent,RestaurantTypesComponent,MatCardModule],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.css'
})
export class ClientHomeComponent {

}
