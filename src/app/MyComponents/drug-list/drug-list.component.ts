import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Drug } from './Drug';
import { CartItem } from './CartItem';
import { DrugsService } from './services/drugs.service';
import { OrderService } from 'src/app/services/order.service';
import { NotifierService } from 'angular-notifier';
import { LocalStorageToken } from 'src/app/localstorage.token';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss'],
})
export class DrugListComponent implements OnInit {
  drugs: Drug[] = [];
  currentCartItems: CartItem[] = [];
  private readonly notifier: NotifierService;
  constructor(
    private drugsService: DrugsService,
    private orderServices: OrderService,
    @Inject(LocalStorageToken) private localstorage: any,
    notifierService: NotifierService
  ) {
    if (this.localstorage.getItem('CartItems')) {
      this.currentCartItems = JSON.parse(localstorage.getItem('CartItems'));
    }
    this.notifier = notifierService;
  }
  ngOnInit() {
    this.drugsService.getAllDrugs().subscribe((drugs) => {
      this.drugs = drugs;
    });
  }

  handleAddToCart(cartItem: CartItem) {
    const cartIndex = this.currentCartItems.findIndex(
      (x) => x.drug_id === cartItem.drug_id
    );
    if (cartIndex === -1) {
      this.notifier.notify(
        'success',
        `A quantity of ${cartItem.selectedQuantity} of the ${cartItem.drug_name} drug has been added to the cart`
      );
      this.currentCartItems.push(cartItem);
    } else {
      this.currentCartItems[cartIndex].selectedQuantity =
        cartItem.selectedQuantity;
      this.currentCartItems[cartIndex].subTotal = cartItem.subTotal;
      this.notifier.notify(
        'success',
        `A quantity of ${cartItem.selectedQuantity} of the ${cartItem.drug_name} drug has been updated to the cart`
      );
    }

    this.localstorage.setItem(
      'CartItems',
      JSON.stringify(this.currentCartItems)
    );
    this.orderServices.setCartItem(this.currentCartItems);
  }
}
