import { Component } from '@angular/core';
import { Order } from './Order';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../users-list/User';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  title: string = 'Orders';
  orderList: Order[] = [];
  currentUser!: User;
  private orderStatus = new BehaviorSubject<string>(null);
  constructor(
    private orderServices: OrderService,
    private userService: UsersService
  ) {
    this.userService.getUserValue().subscribe((user) => {
      this.currentUser = user;
      if (user && user.isAdmin) {
        this.orderServices.getAllOrders().subscribe({
          next: (val) => {
            this.orderList = val.reverse();
          },
        });
      } else if (user && !user.isAdmin) {
        this.orderServices.getMyOrders().subscribe({
          next: (val) => {
            this.orderList = val.reverse();
          },
        });
      }
    });
  }

  updateOrderStatus(id: number) {
    this.orderServices.updateOrderStatus(id).subscribe({
      next: () => {
       const date = new Date()
        this.orderStatus.next(date.toLocaleDateString());
        this.orderServices.getAllOrders().subscribe({
          next: (val) => {
            this.orderList = val.reverse();
            console.log(this.orderList);
          },
        });
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
}
