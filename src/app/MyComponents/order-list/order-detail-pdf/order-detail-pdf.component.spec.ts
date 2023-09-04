import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailPdfComponent } from './order-detail-pdf.component';

describe('OrderDetailPdfComponent', () => {
  let component: OrderDetailPdfComponent;
  let fixture: ComponentFixture<OrderDetailPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
