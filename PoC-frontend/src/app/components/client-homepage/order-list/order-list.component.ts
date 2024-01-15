import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  cartContent: any[] = [];

  constructor(private cartService: CartService) {}

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

  ngOnInit(): void {
    this.cartContent = this.cartService.getCart();
    //console.log(this.cartContent); 
  }
}
