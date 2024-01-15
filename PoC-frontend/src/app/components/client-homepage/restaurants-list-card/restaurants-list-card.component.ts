import { Component, Input, OnInit  } from '@angular/core';
import { Restaurant } from '../../../interfaces/restaurant';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurants-list-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './restaurants-list-card.component.html',
  styleUrl: './restaurants-list-card.component.css'
})
export class RestaurantsListCardComponent {
  @Input() restaurant!: Restaurant;
  photoData: any; // Variabile per memorizzare il contenuto dell'oggetto JSON "photo"
  photoUrl: string = "";

  ngOnInit(): void {
    try {
      // Assicurati che "photo" sia definito e non sia nullo
      if (this.restaurant.photo && typeof this.restaurant.photo === 'object') {
        this.photoData = this.restaurant.photo;
        console.log(this.photoData);
        this.photoUrl = this.photoData.url;
        console.log(this.photoUrl)
      } else {
        console.error('Il campo "photo" non contiene un oggetto JSON valido.');
      }
    } catch (error) {
      console.error('Errore durante il controllo del JSON:', error);
    }
  }
  
}

