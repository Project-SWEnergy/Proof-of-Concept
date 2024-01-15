import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparateBookingBoxesComponent } from './separate-booking-boxes.component';

describe('SeparateBookingBoxesComponent', () => {
  let component: SeparateBookingBoxesComponent;
  let fixture: ComponentFixture<SeparateBookingBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparateBookingBoxesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeparateBookingBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
