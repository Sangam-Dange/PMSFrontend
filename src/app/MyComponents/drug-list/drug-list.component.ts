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
import { User } from '../users-list/User';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss'],
})
export class DrugListComponent implements OnInit, OnChanges {
  drugs: Drug[] = [];
  constDrugs: Drug[] = [];
  currentCartItems: CartItem[] = [];
  tempDrugs: Drug[];
  currentUser!: User;
  searchKeyword!: string;
  private readonly notifier: NotifierService;

  constructor(
    private drugsService: DrugsService,
    private orderServices: OrderService,
    private userServices: UsersService,
    @Inject(LocalStorageToken) private localstorage: any,
    notifierService: NotifierService,
    private activeRoute: ActivatedRoute
  ) {
    if (this.localstorage.getItem('CartItems')) {
      this.currentCartItems = JSON.parse(localstorage.getItem('CartItems'));
    }
    this.notifier = notifierService;
    this.userServices.getUserValue().subscribe((user) => {
      this.currentUser = user;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.drugsService.getAllDrugs().subscribe((drugs) => {
      this.drugs = drugs;
      this.constDrugs = drugs;
    });
    if (this.activeRoute.snapshot.queryParamMap.get('search')) {
      this.searchKeyword =
        this.activeRoute.snapshot.queryParamMap.get('search');
      this.searchDrug();
    }
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

  searchDrug() {
    this.tempDrugs = this.constDrugs;

    if (this.searchKeyword) {
      this.drugs = this.tempDrugs.filter(
        (x) =>
          x.drug_name
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase()) == true
      );
    }

    this.tempDrugs = this.constDrugs;
  }

  deleteDrug(drugId: number) {
    this.drugsService.deleteDrug(drugId).subscribe((val) => console.log(val));
    this.drugs = this.drugs.filter((x) => x.drug_id !== drugId);
  }
}
