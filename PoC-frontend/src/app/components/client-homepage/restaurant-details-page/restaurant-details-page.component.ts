import { Component, OnInit, inject } from '@angular/core';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { ReservationConfirmationComponent } from '../reservation-confirmation/reservation-confirmation.component';
import { MenuComponent } from '../menu/menu.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { ActivatedRoute } from '@angular/router';
import { RestaurantDetailsService } from '../../../services/restaurant-details.service';
import { Dish } from '../../../interfaces/dish';

@Component({
  selector: 'app-restaurant-details-page',
  standalone: true,
  imports: [SlideshowComponent, ReservationConfirmationComponent, MenuComponent, OrderListComponent],
  templateUrl: './restaurant-details-page.component.html',
  styleUrl: './restaurant-details-page.component.css'
})
export class RestaurantDetailsPageComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  restaurantIdParent: number
  restaurnatService: RestaurantDetailsService = inject(RestaurantDetailsService);

  constructor() { 
    this.restaurantIdParent = Number(this.route.snapshot.params['id']);
  }

  dishes: Dish[] = [];

  ngOnInit(): void {
    this.restaurnatService.getAllDishesByRestaurantId(this.restaurantIdParent).then(dishes => {
      this.dishes = dishes;
    });

  }

}
