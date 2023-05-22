import { Injectable, Inject } from '@angular/core';
import { User } from '../MyComponents/users-list/User';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../MyComponents/login-page/LoginUser';
import { RegisterUser } from '../MyComponents/signup-page/RegisterUser';
import { LocalStorageToken } from '../localstorage.token';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userList: User[] = [];

  currentLoggedInUser!: User;
  private approvalStageUser = new BehaviorSubject(this.currentLoggedInUser);
  currentApprovalStageUser = this.approvalStageUser.asObservable();
 
  changeUserValue(user: User) {
    this.approvalStageUser.next(user);
  }

  
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    @Inject(LocalStorageToken) private localstorage: any,
    private http: HttpClient
  ) {
    console.log('User Service created');
  }
  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.localstorage.getItem('token')}`
    ),
  };


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
