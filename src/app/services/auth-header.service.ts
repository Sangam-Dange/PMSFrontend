import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../localstorage.token';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderService {
  header$ = new BehaviorSubject(null);
  private readonly notifier: NotifierService;
  constructor(
    private http: HttpClient,
    @Inject(LocalStorageToken) private localstorage: any,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    if (this.localstorage.getItem('token')) {
      this.header$.next({
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.localstorage.getItem('token')}`
        ),
      });
    } else {
      this.notifier.notify(
        'error',
        'Your session is expired , Please login again!'
      );
    }
  }

  getHeaderValue(){
     var header = null;
     this.header$.subscribe(val=>{
       header = val;
    })
    return header
  }
  ngOnInit() {}

  // get<T>(url) {
  //   this.createAuthorizationHeader();
  //   return this.http.get<T>(url, this.header);
  // }

  // post(url, data) {
  //   this.createAuthorizationHeader();
  //   return this.http.post(url, data, this.header);
  // }
  // put(url, data) {
  //   this.createAuthorizationHeader();
  //   return this.http.put(url, data, this.header);
  // }
  // delete(url) {
  //   this.createAuthorizationHeader();
  //   return this.http.delete(url, this.header);
  // }
}
