import { Component, Inject } from '@angular/core';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { OrderService } from 'src/app/services/order.service';
import { CartItem } from '../drug-list/CartItem';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  cartItems: CartItem[] = [];
  constructor(
    private orderServices: OrderService,
    @Inject(LocalStorageToken) private localstorage: any
  ) {
    const CurrCartItems = JSON.parse(this.localstorage.getItem('CartItems'));
    if (CurrCartItems) {
      this.cartItems = CurrCartItems;
    }
  }

  removeDrug(drug: CartItem) {
    this.cartItems = this.cartItems.filter((x) => x.drug_id !== drug.drug_id);
    this.localstorage.setItem('CartItems', JSON.stringify(this.cartItems));
    this.orderServices.setCartItem(this.cartItems);
  }
}
