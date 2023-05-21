import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorageToken } from './localstorage.token';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Pharmacy Management System';
  constructor(private userServices: UsersService) {}

  ngOnInit() {
    this.userServices.getUserByToken().subscribe((user) => {
      this.userServices.currentLoggedInUser = user;
    });
  }
}
