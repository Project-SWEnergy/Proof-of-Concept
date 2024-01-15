import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurateurHomeComponent } from './restaurateur-home.component';

describe('RestaurateurHomeComponent', () => {
  let component: RestaurateurHomeComponent;
  let fixture: ComponentFixture<RestaurateurHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurateurHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurateurHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
