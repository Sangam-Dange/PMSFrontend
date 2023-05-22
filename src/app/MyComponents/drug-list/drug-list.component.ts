import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Drug } from './Drug';
import { DrugsService } from './services/drugs.service';
import { OrderService } from 'src/app/services/order.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss'],
})
export class DrugListComponent implements OnInit, OnChanges {
  drugs: Drug[] = [];
  currentCartItems: Drug[] = [];
  constructor(
    private drugsService: DrugsService,
    private orderServices: OrderService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.currentCartItems);
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.orderServices.currentDrugList.subscribe((orderList) => {
      this.currentCartItems = orderList;
    });
    this.drugsService.getAllDrugs().subscribe((drugs) => {
      this.drugs = drugs;
    });
  }

  handleAddToCart(drug: Drug) {
    this.currentCartItems.push(drug);
    this.orderServices.changeDrugsListValue(this.currentCartItems);
  }

  // addToCart() {
  //   const newDrug: Drug = {
  //     drug_id: 2,
  //     drug_name: 'string',
  //     price: 2,
  //     batch_id: 'string',
  //     quantity: 2,
  //     expiry_date: new Date(),
  //     supplierDetail: {
  //       id: 2,
  //       supplier_name: 'string',
  //       supplier_email: 'string',
  //       supplier_address: 'string',
  //       supplier_phone: 'string',
  //     },
  //     supplierDetailId: 2,
  //   };
  //   this.currentCartItems.push(newDrug);
  //   console.log(this.currentCartItems)
  // }
}
