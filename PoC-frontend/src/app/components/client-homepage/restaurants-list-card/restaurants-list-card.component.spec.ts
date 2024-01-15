import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsListCardComponent } from './restaurants-list-card.component';

describe('RestaurantsListCardComponent', () => {
  let component: RestaurantsListCardComponent;
  let fixture: ComponentFixture<RestaurantsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
