import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  title: string = 'Order Details';
  orderDetails!: any;

  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderService
      .getOrderDetails(this.activeRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (val) => {
          this.orderDetails = val;
          console.log(val);
        },
      });
  }
}
