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
  title = 'Welcome to PharmaShop';

  value: boolean = false;
  visible: boolean = false;

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
    console.log(this.loginUser);
    if (this.loginUser.email && this.loginUser.password) {
      this.userServices.loginUser(this.loginUser).subscribe({
        next: (res) => {
          this.notifier.notify('success', 'Successfully Logged In');
          this.localstorage.setItem('token', res['token']);

          this.userServices.changeUserValue(res['payload']);
          if (
            res['payload'].isAdmin !== null ||
            res['payload'].isSuperAdmin === true
          ) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/unauthorized']);
          }
        },
        error: (error) => {
          this.notifier.notify('error', 'Invalid Credentials');
          console.log(error);
        },
      });
    }
  }
}
