import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { OrderService } from 'src/app/services/order.service';
import { User } from '../users-list/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  cartCount: Number;
  number: any;
  currentUser!: User;
  subscription: Subscription;

  constructor(
    private orderServices: OrderService,
    private userServices: UsersService,
    @Inject(LocalStorageToken) private localstorage: any
  ) {
    const CurrCartItems = JSON.parse(this.localstorage.getItem('CartItems'));
    if (CurrCartItems) {
      this.cartCount = CurrCartItems.length;
    }
    this.subscription = this.orderServices.getCartItem().subscribe((val) => {
      this.cartCount = val?.length;
    });
    this.userServices.getUserValue().subscribe((val) => {
      this.currentUser = val;
    });
  }

  handleLogout() {
    this.localstorage.removeItem('token');
    this.userServices.changeUserValue(null);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
} 
