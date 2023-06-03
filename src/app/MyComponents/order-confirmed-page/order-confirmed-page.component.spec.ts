import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmedPageComponent } from './order-confirmed-page.component';

describe('OrderConfirmedPageComponent', () => {
  let component: OrderConfirmedPageComponent;
  let fixture: ComponentFixture<OrderConfirmedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderConfirmedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
