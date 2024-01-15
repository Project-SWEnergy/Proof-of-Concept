import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit {
  time: Date;
  timeFormatted: String;

  constructor() { }

  ngOnInit(): void {
    this.aggiornaOra();
    setInterval(() => this.aggiornaOra(), 1000);
  }

  aggiornaOra(): void {
    this.time = new Date();
    this.timeFormatted = this.formatTime(this.time);
  }

  formatTime(date: Date): string {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    //const seconds = this.padZero(date.getSeconds());
    //return `${hours}:${minutes}:${seconds}`;
    return `${hours}:${minutes}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}