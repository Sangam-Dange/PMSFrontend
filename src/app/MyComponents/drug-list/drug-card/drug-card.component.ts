import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Drug } from '../Drug';
import { DatePipe } from '@angular/common';
import { CartItem } from '../CartItem';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { User } from '../../users-list/User';

@Component({
  selector: 'app-drug-card',
  templateUrl: './drug-card.component.html',
  styleUrls: ['./drug-card.component.scss'],
  providers: [DatePipe],
})
export class DrugCardComponent implements OnInit {
  @Input() drug: Drug;
  selectedQuantity: number = 1;
  @Input() currentUser!: User;
  constructor(@Inject(LocalStorageToken) private localstorage: any) {}
  ngOnInit() {
    const CurrCartItems = JSON.parse(this.localstorage.getItem('CartItems'));
    if (CurrCartItems) {
      const currIndexOfItem = CurrCartItems.findIndex(
        (x) => x.drug_id == this.drug.drug_id
      );

      if (currIndexOfItem !== -1) {
        this.selectedQuantity = CurrCartItems[currIndexOfItem].selectedQuantity;
      }
    }
  }

  @Output() selectedCartItemEvent = new EventEmitter<CartItem>();
  addToCartDrug(selectedDrug: Drug) {
    const cartItem: CartItem = {
      drug_id: selectedDrug.drug_id,
      drug_name: selectedDrug.drug_name,
      price: selectedDrug.price,
      quantity: selectedDrug.quantity,
      selectedQuantity: this.selectedQuantity,
      subTotal: selectedDrug.price * this.selectedQuantity,
      supplierDetailId: selectedDrug.supplierDetailId,
    };
    this.selectedCartItemEvent.emit(cartItem);
  }

  @Output() deleteDrugEvent = new EventEmitter<number>();
  deleteDrug(drugId: number) {
    this.deleteDrugEvent.emit(drugId);
  }

  incQuantity() {
    if (this.selectedQuantity < this.drug.quantity) {
      this.selectedQuantity += 1;
    }
  }
  decrQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity -= 1;
    }
  }
}
