import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  title: string = 'Users';

  @Input() userList: User[] = [];
  @Input() AuthUsers: User[] = [];
  @Input() UnAuthUsers: User[] = [];
  constructor(private userServices: UsersService) {}
  authorizeUser(user: User) {
    console.log(user);
    var role = {
      isAdmin: false,
    };
    if (user.requestedFor == 'Admin') {
      role.isAdmin = true;
    } else {
      role.isAdmin = false;
    }

    this.userServices.changeUserRole(user?.id, role).subscribe((res) => {
      console.log(res);
    });
    this.AuthUsers.push(user);
    this.UnAuthUsers = this.UnAuthUsers.filter((x) => x.id != user.id);
  }
  unAuthorizeUser(user: User) {
    console.log(user);
    this.userServices.UnAuthoizeUser(user?.id).subscribe((res) => {
      console.log(res);
    });

    this.UnAuthUsers.push(user);
    this.AuthUsers = this.AuthUsers.filter((x) => x.id != user.id);
  }
}
