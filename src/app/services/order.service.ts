import { Injectable, OnInit } from '@angular/core';
import { Drug } from '../MyComponents/drug-list/Drug';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnInit {
  drug: Drug[] = [];
  private approvalStageDrugs = new BehaviorSubject(this.drug);
  currentDrugList = this.approvalStageDrugs.asObservable();

  changeDrugsListValue(drug: Drug[]) {
    this.approvalStageDrugs.next(drug);
  }
  constructor() {}

  ngOnInit() {
    this.currentDrugList.subscribe((orderList) => {
      console.log(orderList);
    });
  }
}
