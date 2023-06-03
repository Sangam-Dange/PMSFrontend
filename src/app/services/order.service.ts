import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../MyComponents/drug-list/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaceOrder } from '../MyComponents/checkout-page/PlaceOrder';
import { Order } from '../MyComponents/order-list/Order';
import { AuthHeaderService } from './auth-header.service';
import { LocalStorageToken } from '../localstorage.token';

@Injectable()
export class OrderService {
  cartItems!: CartItem[];
  private cartItemSubject = new BehaviorSubject<CartItem[]>(
    JSON.parse(localStorage.getItem('CartItems')) || this.cartItems
  );

  constructor(
    private http: HttpClient,
    @Inject(LocalStorageToken) private localstorage: any
  ) {}

  setCartItem(cartItems: CartItem[]) {
    this.cartItemSubject.next(cartItems);
  }
  getCartItem(): Observable<CartItem[]> {
    return this.cartItemSubject.asObservable();
  }

  placeOrder(placeOrder: PlaceOrder) {
    return this.http.post('/api/Orders/PlaceOrder', placeOrder);
  }

  getAllOrders() {
    return this.http.get<Order[]>('/api/Orders');
  }
  getMyOrders() {
    return this.http.get<Order[]>('/api/Orders/GetMyOrders');
  }

  getOrderDetails(orderId: string) {
    return this.http.get(`/api/Orders/getOrderDetailsByOrderId/${orderId}`);
  }
}
