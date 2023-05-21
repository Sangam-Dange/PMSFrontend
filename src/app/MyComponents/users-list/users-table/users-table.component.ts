import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  @Input() userList: User[] = [];
  @Input() title: string = '';
  @Output() selectedUserId = new EventEmitter<number>();
  authorizeUser(userId?: number) {
    this.selectedUserId.emit(userId);
  }
}
