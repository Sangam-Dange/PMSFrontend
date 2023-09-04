import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  userList: User[] = [];
  AuthUsers: User[] = [];
  UnAuthUsers: User[] = [];
  title!: string;
  myModel: string = '';
  currentUser!: User;
  check?: boolean;

  constructor(private userServices: UsersService) {}

  ngOnInit(): void {
    this.userServices.getUsers().subscribe((users) => {
      this.userList = users;
    });

    this.userServices.getAuthorizedUsers().subscribe((users) => {
      this.AuthUsers = users;
    });
    this.userServices.getUnAuthorizedUsers().subscribe((users) => {
      this.UnAuthUsers = users;
    });
  }

}
