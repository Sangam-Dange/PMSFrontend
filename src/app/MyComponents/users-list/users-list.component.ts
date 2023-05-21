import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnChanges {
  userList: User[] = [];

  title!: string;
  myModel: string = '';
  currentUser!: User;
  check?: boolean;

  ngOnChanges(changes: SimpleChanges): void {}

  selectedUserId(userId: number) {
    const grabbedUser = this.userList.find((x) => x.id == userId);

    if (grabbedUser?.requestedFor == 'Admin') {
      if (this.check == undefined) {
        this.check = true;
      } else {
        this.check = undefined;
      }
    } else {
      if (this.check == undefined) {
        this.check = false;
      } else {
        this.check = undefined;
      }
    }
    if (grabbedUser) {
      grabbedUser.isAdmin = this.check;
    }
  }

  addUser() {
    const newUser: User = {
      id: 3,
      name: 'sangam1',
      contact: '77418179174',
      email: 'sangam1@gmail.com',
      requestedFor: 'Doctor',
      isAdmin: undefined,
      isSuperAdmin: false,
    };

    this.userList.push(newUser);
  }

  toggle() {
    this.title = 'Users List';
  }

  constructor(private userServices: UsersService) {}

  ngOnInit(): void {
   this.userServices.getUsers().subscribe(users => {
    this.userList = users
   });
  }
}
