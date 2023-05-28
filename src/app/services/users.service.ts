import { Injectable, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../MyComponents/users-list/User';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../MyComponents/login-page/LoginUser';
import { RegisterUser } from '../MyComponents/signup-page/RegisterUser';
import { LocalStorageToken } from '../localstorage.token';
import { BehaviorSubject } from 'rxjs';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userList: User[] = [];

  private currentLoggedInUser = new BehaviorSubject<User>(null);
  changeUserValue(user: User) {
    this.currentLoggedInUser.next(user);
  }
  getUserValue() {
    return this.currentLoggedInUser.asObservable();
  }

  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.localstorage.getItem('token')}`
    ),
  };

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    @Inject(LocalStorageToken) private localstorage: any,
    private authHeaderService: AuthHeaderService,
    private http: HttpClient
  ) {
    console.log('User Service created');
    console.log(this.authHeaderService.getHeaderValue());
  }

  getUserByToken() {
    return this.http.get<User>('/api/Auth/getUserByToken', this.header);
  }
  getUsers() {
    return this.http.get<User[]>('/api/Users');
  }
  registerUser(newUser: RegisterUser) {
    return this.http.post('/api/Auth/register', newUser);
  }
  loginUser(user: LoginUser) {
    return this.http.post('/api/Auth/login', user);
  }

}
