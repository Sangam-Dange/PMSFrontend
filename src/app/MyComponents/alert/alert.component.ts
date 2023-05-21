import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [fadeInUpOnEnterAnimation({ duration: 1000 })],
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() condition: boolean = false;
  @Input() alertType: string = 'alert-success';
  @Input() message: string;
  @Input() visible: boolean = false;
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    setTimeout(() => {
      this.condition = false;
    }, 3000);
  }
}
