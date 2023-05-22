import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drug } from '../Drug';

@Component({
  selector: 'app-drug-card',
  templateUrl: './drug-card.component.html',
  styleUrls: ['./drug-card.component.scss'],
})
export class DrugCardComponent {
  @Input() drugs: Drug[];
  constructor() {}

  @Output() selectedDrug = new EventEmitter<Drug>();
  addToCartDrug(selectedDrug?: Drug) {
    this.selectedDrug.emit(selectedDrug);
  }
}
