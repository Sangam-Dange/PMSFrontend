import { Injectable } from '@angular/core';
import { User } from '../MyComponents/users-list/User';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../MyComponents/login-page/LoginUser';
import { RegisterUser } from '../MyComponents/signup-page/RegisterUser';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userList: User[] = [];
  public currentLoggedInUser = new BehaviorSubject<User>(null);
  isLoggedInUser: boolean = false;
  changeUserValue(user: User) {
    this.currentLoggedInUser.next(user);
  }
  getUserValue() {
    return this.currentLoggedInUser.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    console.log('User Service created');
  }
  
  // baseUrl:string = "https://pms-webapi.azurewebsites.net";
  baseUrl:string = "https://localhost:7051";
  getUserByToken() {
    return this.http.get<User>(this.baseUrl+'/api/Auth/getUserByToken');
  }

  isLoggedIn() {
    if (this.currentLoggedInUser.value) {
      this.isLoggedInUser = true;
    } else {
      this.router.navigate(['/login']);
      this.isLoggedInUser = false;
    }
    return this.isLoggedInUser;
  }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl+'/api/Users');
  }
  getAuthorizedUsers() {
    return this.http.get<User[]>(this.baseUrl+'/api/Users/GetAuthorizedUsers');
  }
  getUnAuthorizedUsers() {
    return this.http.get<User[]>(this.baseUrl+'/api/Users/GetUnAuthorizedUsers');
  }
  changeUserRole(userId: number, check: any) {
    return this.http.put(this.baseUrl+`/api/Users/ChangeUserRole/${userId}`, check);
  }
  UnAuthoizeUser(userId: number) {
    return this.http.get(this.baseUrl+`/api/Users/UnAuthoizeUser/${userId}`);
  }
  registerUser(newUser: RegisterUser) {
    return this.http.post(this.baseUrl+'/api/Auth/register', newUser);
  }
  loginUser(user: LoginUser) {
    return this.http.post(this.baseUrl+'/api/Auth/login', user);
  }
}
