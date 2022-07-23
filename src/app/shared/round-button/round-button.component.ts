import { Component, Input, OnInit } from '@angular/core';
import { ColorState } from 'src/app/constants/colorState';

@Component({
  selector: 'app-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.scss'],
})
export class RoundButtonComponent implements OnInit {
  @Input() color: string = '';
  @Input() iconSrc: string = '';
  colorClasses: Object = {
    success: false,
    warning: false,
    danger: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.colorClasses = {
      success: this.color === ColorState.SUCCESS,
      warning: this.color === ColorState.WARNING,
      danger: this.color === ColorState.DANGER,
    };
  }
}
