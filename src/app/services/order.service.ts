import { Injectable, OnInit } from '@angular/core';
import { Drug } from '../MyComponents/drug-list/Drug';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../MyComponents/drug-list/CartItem';

@Injectable()
export class OrderService {
  private cartItemSubject = new Subject<any>();

  setCartItem(cartItems: CartItem[]) {
    this.cartItemSubject.next(cartItems);
  }
  getCartItem(): Observable<CartItem[]> {
    return this.cartItemSubject.asObservable();
  }

  constructor() {
    console.log('Order service created');
  }
}
