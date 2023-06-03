import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageToken } from 'src/app/localstorage.token';

@Component({
  selector: 'app-order-confirmed-page',
  templateUrl: './order-confirmed-page.component.html',
  styleUrls: ['./order-confirmed-page.component.scss'],
})
export class OrderConfirmedPageComponent {
  newOrder!: any;
  constructor(
    @Inject(LocalStorageToken) private localstorage: any
  ) {
    this.newOrder = JSON.parse(this.localstorage.getItem('currentOrder'));
  }
}
