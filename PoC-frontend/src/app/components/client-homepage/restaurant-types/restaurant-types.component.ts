import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TagSelectionService } from '../../../services/tag-selection.service';
import { MatChipsModule } from '@angular/material/chips';
import {NgFor} from '@angular/common';


export interface Chip {
  name: string;
  color: ThemePalette;
  selected: boolean;
}

@Component({
  selector: 'app-restaurant-types',
  standalone: true,
  imports: [MatChipsModule,NgFor],
  templateUrl: './restaurant-types.component.html',
  styleUrl: './restaurant-types.component.css'
})

export class RestaurantTypesComponent {
  cuisineType: Chip[] = [
    { name: 'Onnivora', color: 'primary', selected: false },
    { name: 'Vegana', color: 'accent', selected: false },
    { name: 'Vegetariana', color: 'warn', selected: false },
  ];

  tags: Chip[] = [
    { name: 'Kebab', color: 'primary', selected: false },
    { name: 'Pasta', color: 'accent', selected: false },
    { name: 'Italiano', color: 'warn', selected: false },
  ];

  constructor(private tagSelectionService: TagSelectionService) {}

  toggleSelection(chip: Chip): void {
    chip.selected = !chip.selected;
    this.tagSelectionService.toggleTagSelection(chip.name);
  }
}
