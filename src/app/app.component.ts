import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from './MyComponents/users-list/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Pharmacy Management System';
  currentUser!: User;
  private readonly notifier: NotifierService;

  constructor(
    private userServices: UsersService,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.userServices.getUserValue().subscribe({
      next: (val) => {
        this.currentUser = val;
      },
    });
  }

  ngOnInit() {
    this.userServices.getUserByToken().subscribe({
      next: (user) => {
        this.userServices.changeUserValue(user);
      },
      error: (error) => {
        this.router.navigate(['/login']);
        this.notifier.notify('error', error.error);
      },
    });
  }
}
