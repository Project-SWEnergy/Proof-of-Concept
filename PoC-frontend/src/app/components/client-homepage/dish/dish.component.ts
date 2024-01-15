import { Component, Input } from '@angular/core';
import { Dish } from '../../../interfaces/dish';



@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent {
  @Input() dish!: Dish;

}
