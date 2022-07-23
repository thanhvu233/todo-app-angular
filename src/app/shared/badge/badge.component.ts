import { Component, Input, OnInit } from '@angular/core';
import { ColorState } from 'src/app/constants/colorState';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() color: string = '';
  @Input() text: string = '';
  colorClasses: Object = {
    success: false,
    danger: false,
    primary: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.colorClasses = {
      success: this.color === ColorState.SUCCESS,
      danger: this.color === ColorState.DANGER,
      primary: this.color === ColorState.PRIMARY,
    };
  }
}
