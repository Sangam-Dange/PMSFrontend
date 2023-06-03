import { Component, Inject } from '@angular/core';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { OrderService } from 'src/app/services/order.service';
import { CartItem } from '../drug-list/CartItem';
import { User } from '../users-list/User';
import { UsersService } from 'src/app/services/users.service';
import { PlaceOrder } from './PlaceOrder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  cartItems: CartItem[] = [];
  total!: number;
  totalItems!: number;
  currentUser!: User;
  constructor(
    private orderServices: OrderService,
    private userService: UsersService,
    private router: Router,
    @Inject(LocalStorageToken) private localstorage: any
  ) {
    this.orderServices.getCartItem().subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log(this.cartItems , cartItems)
      this.total = cartItems?.reduce(
        (sum, current) => sum + current.subTotal,
        0
      );
      this.totalItems = cartItems?.reduce(
        (sum, current) => sum + current.selectedQuantity,
        0
      );
    });

    this.userService.getUserValue().subscribe({
      next: (val) => {
        this.currentUser = val;
      },
    });
  }

  removeDrug(drug: CartItem) {
    this.cartItems = this.cartItems.filter((x) => x.drug_id !== drug.drug_id);
    this.localstorage.setItem('CartItems', JSON.stringify(this.cartItems));
    this.orderServices.setCartItem(this.cartItems);
  }

  placeOrder() {
    const newOrder: PlaceOrder = {
      createOrderDto: {
        total: this.total,
        userId: this.currentUser.id,
        totalItems: this.totalItems,
        order_date: new Date(),
      },
      orderDetails: this.cartItems.map((val) => {
        return {
          drugId: val.drug_id,
          drug_quantity: val.selectedQuantity,
          sub_total: val.subTotal,
        };
      }),
    };

    this.orderServices.placeOrder(newOrder).subscribe({
      next: (val) => {
        this.localstorage.removeItem('CartItems');
        this.orderServices.setCartItem(null);
        this.localstorage.setItem('currentOrder', JSON.stringify(val));
        this.router.navigate([`/orderconfirmed`]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
