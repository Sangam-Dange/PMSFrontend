import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../localstorage.token';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderService {
  header$ = new BehaviorSubject(this.localstorage.getItem('token'));
  private readonly notifier: NotifierService;
  constructor(
    private http: HttpClient,
    @Inject(LocalStorageToken) private localstorage: any,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    if (this.localstorage.getItem('token')) {
      this.header$.next(
        new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.localstorage.getItem('token')}`
        )
      );
    } else {
      this.notifier.notify(
        'error',
        'Your session is expired , Please login again!'
      );
    }
  }

  getHeaderValue() {
    var header = null;
    this.header$.subscribe((val) => {
      header = val;
    });
    return header;
  }
  ngOnInit() {}


}
