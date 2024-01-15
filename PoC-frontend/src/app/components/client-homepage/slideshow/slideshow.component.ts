import { Component } from '@angular/core';

//TODO1: Bisogna creare una interfaccia (file) a parte?
//? Bisogna creare una interfaccia (file) a parte?
interface Slide {
  id: number;
  imageUrl: string;
}

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {

  slides: Slide[] = [
    { id: 1, imageUrl: 'https://www.w3schools.com/howto/img_nature_wide.jpg' },
    { id: 2, imageUrl: 'https://www.w3schools.com/howto/img_nature_wide.jpg' },
    { id: 3, imageUrl: 'https://www.w3schools.com/howto/img_nature_wide.jpg' }
  ];

  slideIndex: number = 1;

  ngAfterViewInit() {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  //TODO2: Sistemare sto schifo evitando di manipolare direttamente il DOM, ma usando la manipolazione dei dati di Angular
  showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = (dots[i] as HTMLElement).className.replace(" active", "");
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
    (dots[this.slideIndex - 1] as HTMLElement).className += " active";
  }

}
