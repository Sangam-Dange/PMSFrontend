import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Drug } from '../Drug';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CartItem } from '../CartItem';
import { LocalStorageToken } from 'src/app/localstorage.token';
@Component({
  selector: 'app-drug-card',
  templateUrl: './drug-card.component.html',
  styleUrls: ['./drug-card.component.scss'],
  providers: [DatePipe],
})
export class DrugCardComponent implements OnInit {
  @Input() drug: Drug;
  formattedDate: string;
  selectedQuantity: number = 1;
  constructor(
    private datePipe: DatePipe,
    @Inject(LocalStorageToken) private localstorage: any
  ) {}
  ngOnInit() {
    this.formattedDate = this.datePipe.transform(
      this.drug.expiry_date,
      'yyyy/MM/dd'
    );

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
  @Output() selectedCartItem = new EventEmitter<CartItem>();
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
    this.selectedCartItem.emit(cartItem);
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
