import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { RegisterUser } from './RegisterUser';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  title = 'Welcome to PharmaShop';
  alertCondition: boolean = false;
  message!: string;
  alertType!: string;
  private readonly notifier: NotifierService;
  newUser: RegisterUser = {
    name: '',
    contact: '',
    email: '',
    password: '',
    requestedFor: 'Doctor',
  };

  onRadioChange(e: any) {
    console.log(e.target.value);
    this.newUser.requestedFor = e.target.value;
  }

  constructor(
    private userServices: UsersService,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  handleSignup() {
    this.alertCondition = true;
    this.userServices.registerUser(this.newUser).subscribe(
      (res) => {
        this.notifier.notify('success', 'Successfully created account');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.notifier.notify('error', error.error);
      }
    );
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
}
