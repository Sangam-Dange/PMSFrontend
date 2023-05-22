import { Component, OnInit } from '@angular/core';
import {
  fadeInUpOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeOutUpOnLeaveAnimation,
} from 'angular-animations';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../users-list/User';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 1000, delay: 100 }),
    fadeOutOnLeaveAnimation({ duration: 1000, delay: 100 }),
    fadeInUpOnEnterAnimation({
      anchor: 'enter',
      duration: 1000,
      delay: 100,
      translate: '70px',
    }),
    fadeOutUpOnLeaveAnimation({ duration: 1000 }),
  ],
})
export class LandingPageComponent implements OnInit {
  condition: boolean = true;
  rubberState: boolean = true;
  currentUser!: User;
  constructor(private userServices: UsersService) {}

  ngOnInit() {
    this.userServices.currentApprovalStageUser.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
