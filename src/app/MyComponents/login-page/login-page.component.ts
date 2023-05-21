import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { LoginUser } from './LoginUser';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  title = 'Welcome to PMS';
  welcomeNote: string = 'welcome to app';
  value: boolean = false;
  visible: boolean = false;
  alertCondition: boolean = false;
  message!: string;
  alertType!: string;
  private readonly notifier: NotifierService;
  loginUser: LoginUser = {
    email: '',
    password: '',
  };

  constructor(
    private userServices: UsersService,
    private router: Router,
    @Inject(LocalStorageToken) private localstorage: any,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  handleLogin() {
    if (this.loginUser.email && this.loginUser.password) {
      this.userServices.loginUser(this.loginUser).subscribe(
        (res) => {
          this.notifier.notify('success', 'Successfully Loged In');
          this.localstorage.setItem('token', res['token']);
          this.userServices.currentLoggedInUser = res["payload"]
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        (error) => {
          this.notifier.notify('error', error.error);
        }
      );
    }
  }
}