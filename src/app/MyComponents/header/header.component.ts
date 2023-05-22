import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  cartCount: Number;
  constructor(private orderServices: OrderService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.orderServices.currentDrugList.subscribe((val) => {
      console.log(val)
      this.cartCount = val.length;
    });
  }
}
