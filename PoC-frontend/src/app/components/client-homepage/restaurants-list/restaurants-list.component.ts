import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RestaurantsListCardComponent } from '../restaurants-list-card/restaurants-list-card.component';
import { Restaurant } from '../../../interfaces/restaurant';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../services/restaurant.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TagSelectionService } from '../../../services/tag-selection.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-restaurants-list',
  standalone: true,
  imports: [CommonModule, RestaurantsListCardComponent, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule],
  templateUrl: './restaurants-list.component.html',
  styleUrl: './restaurants-list.component.css'
})
export class RestaurantsListComponent implements OnInit, OnDestroy {
  restaurantList: Restaurant[] = [];
  restaurantListFiltered: Restaurant[] = [];
  private tagSubscription: Subscription;
  searchText: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private tagSelectionService: TagSelectionService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.restaurantService.getAllRestaurants().then(restaurants => {
      this.restaurantList = restaurants;
      this.restaurantListFiltered = this.restaurantList;
    });

    this.tagSubscription = this.tagSelectionService.getSelectedTags().subscribe(tags => {
      this.filterRestaurantsByTags(tags);
    });

    this.cartService.clearCart();
  }

  filterRestaurantsByTags(tags: string[]): void {
    console.log("Tags selezionati:", tags);
  console.log("Lista ristoranti prima del filtraggio:", this.restaurantList);
  
    if (tags.length === 0) {
      this.restaurantListFiltered = this.restaurantList;
    } else {
      this.restaurantListFiltered = this.restaurantList.filter(restaurant =>
        tags.some(tag => restaurant.tags.includes(tag))
      );
      console.log("Lista ristoranti dopo il filtraggio:", this.restaurantListFiltered);
    }
    //this.filterRestaurants(); // Aggiunto per mantenere la coerenza con la ricerca testuale
  }

  filterRestaurants(): void {
    const searchTextLowerCase = this.searchText.toLowerCase().trim();
    if (searchTextLowerCase === '') {
      this.restaurantListFiltered = this.restaurantList;
    } else {
      this.restaurantListFiltered = this.restaurantListFiltered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTextLowerCase)
      );
    }
  }

  ngOnDestroy() {
    this.tagSubscription.unsubscribe();
  }
}