import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactBookingBoxesComponent } from './compact-booking-boxes.component';

describe('CompactBookingBoxesComponent', () => {
  let component: CompactBookingBoxesComponent;
  let fixture: ComponentFixture<CompactBookingBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactBookingBoxesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompactBookingBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
