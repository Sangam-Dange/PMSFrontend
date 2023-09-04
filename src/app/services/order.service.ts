import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../MyComponents/drug-list/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaceOrder } from '../MyComponents/checkout-page/PlaceOrder';
import { Order } from '../MyComponents/order-list/Order';
import { AuthHeaderService } from './auth-header.service';
import { LocalStorageToken } from '../localstorage.token';
import { EmailDto } from '../MyComponents/checkout-page/EmailDto';

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
  // baseUrl:string = "https://pms-webapi.azurewebsites.net";
  baseUrl:string = "https://localhost:7051"
  placeOrder(placeOrder: PlaceOrder) {
    return this.http.post(this.baseUrl+'/api/Orders/PlaceOrder', placeOrder);
  }
  updateOrderStatus(orderId: number) {
    return this.http.get(this.baseUrl+`/api/Orders/updateOrderStatus/${orderId}`);
  }
  sendEmail(email: EmailDto) {
    return this.http.post(this.baseUrl+'/api/EmailService', email);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.baseUrl+'/api/Orders');
  }
  getMyOrders() {
    return this.http.get<Order[]>(this.baseUrl+'/api/Orders/GetMyOrders');
  }

  getOrderDetails(orderId: string) {
    return this.http.get(this.baseUrl+`/api/Orders/getOrderDetailsByOrderId/${orderId}`);
  }
}
