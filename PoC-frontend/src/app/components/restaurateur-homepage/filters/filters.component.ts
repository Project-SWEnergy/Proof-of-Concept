import { Component, inject, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ShareDataService } from '../../../services/share-data.service';
import { ReservationManagerService } from '../../../services/reservation-manager.service';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';


const LOCALE_CODE: string = 'it';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    FormsModule,
    DatePipe,
    CommonModule
  ],
  providers: [
    DatePipe,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {
  shareDataService: ShareDataService = inject(ShareDataService);

  private _formattedDate: string | null = '';
  private _selectedDate: Date = new Date();
  set selectedDate(value: Date) {
    this._selectedDate = value;
    this._formattedDate = this.formatDate(this._selectedDate, LOCALE_CODE);

    this.shareDataService.formattedDate = this._formattedDate!;
    this.shareDataService.setSelectedDate(this.selectedDate);
  }
  get selectedDate(): Date {
    return this._selectedDate;
  }

  isChecked: boolean = false;
  ariaLabelToggle: string = "Visualizza liste separate"


  constructor(private datePipe: DatePipe) { }


  ngOnInit(): void {
    this._formattedDate = this.formatDate(this.selectedDate, LOCALE_CODE);
    this.shareDataService.formattedDate = this._formattedDate!;
  }


  /**
   * @description Fornisce la formattazione corretta della data in base alla località selezionata.
   * @param {Date} date Data da convertire.
   * @param {string} locale Codice identificativo della regione su cui basare la formattazione.
   * @returns {string | null} Stringa rappresentate il nuovo formato della data, oppure null.
   */
  private formatDate(date: Date, locale: string): string | null {
    if (date) {
      registerLocaleData(localeIt, locale);

      return this.datePipe.transform(date, 'EEEE dd/MM/yyyy', undefined, locale);
    }
    return '';
  }
}
