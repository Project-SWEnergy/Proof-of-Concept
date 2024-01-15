import { Component, Input, inject } from '@angular/core';
import { DishComponent } from '../dish/dish.component';
import { Dish } from '../../../interfaces/dish';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../../services/cart.service';
import { NgFor } from '@angular/common'; // Import NgFor directive
import { RestaurantDetailsService } from '../../../services/restaurant-details.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [DishComponent, MatButtonModule, MatIconModule, MatCardModule, NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit {

  @Input() restaurantId: number;
  DishList: Dish[] = [];
  urlPhotoList: string[];
  service: CartService = inject(CartService);
  restaurnartDetailsService : RestaurantDetailsService = inject(RestaurantDetailsService);


  constructor(private cartService: CartService) {
  }

  /*ngOnInit(): void {
    this.restaurnartDetailsService.getAllDishesByRestaurantId(this.restaurantId)
      .then(dishes => {
        this.DishList = dishes;
      });
  }*/

  ngOnInit(): void {
    this.restaurnartDetailsService.getAllDishesByRestaurantId(this.restaurantId)
      .then(dishes => {
        this.DishList = dishes.map(dish => {
          // Assumendo che 'image' sia un oggetto JSON con una proprietà 'url'
          const imageUrl = dish.image && typeof dish.image === 'object' ? (dish.image as any)['url'] : null;
          return {
            ...dish,
            image: imageUrl
          };
        });
      });
  }
  

  addToCart(dish: any): void {
    this.cartService.addToCart(dish);
  }

  removeFromCart(dish: any): void {
    this.cartService.removeFromCart(dish);
  }

  get cart(): any[] {
    return this.cartService.cart;
  }

  saveReservation(): void {
    // Implementazione per salvare la prenotazione usando il service o gestisci qui direttamente nel componente
  }

  /*DishList: Dish[] = [
    {
      id: 1,
      name: 'Pizza',
      description: 'Pizza with tomato and cheese',
      price: 5,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
      allergens: 'Gluten'
    },
    {
      id: 2,
      name: 'Hamburger',
      description: 'Hamburger with cheese and bacon',
      price: 4,
      image: 'https://www.my-personaltrainer.it/2020/09/07/hamburger_900x760.jpeg',
      allergens: 'Gluten'
    },
    {
      id: 3,
      name: 'Salad',
      description: 'Salad with tomato and cheese',
      price: 3,
      image: 'https://www.eatingwell.com/thmb/rmLlvSjdnJCCy_7iqqj3x7XS72c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chopped-power-salad-with-chicken-0ad93f1931524a679c0f8854d74e6e57.jpg',
      allergens: 'Gluten'
    },
    {
      id: 4,
      name: 'Pasta',
      description: 'Pasta with tomato and cheese',
      price: 2,
      image: 'https://media-assets.lacucinaitaliana.it/photos/6426da66217d19c609f6f4f8/16:9/w_2560%2Cc_limit/GettyImages-522387318.jpg',
      allergens: 'Gluten'
    }
  ];*/

}
