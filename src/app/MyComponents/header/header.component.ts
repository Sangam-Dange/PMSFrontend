import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  cartCount: Number;
  number: any;
  subscription: Subscription;

  constructor(
    private orderServices: OrderService,
    @Inject(LocalStorageToken) private localstorage: any
  ) {
    const CurrCartItems = JSON.parse(this.localstorage.getItem('CartItems'));
    if (CurrCartItems) {
      this.cartCount = CurrCartItems.length;
    }
    this.subscription = this.orderServices.getCartItem().subscribe((val) => {
      this.cartCount = val.length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
