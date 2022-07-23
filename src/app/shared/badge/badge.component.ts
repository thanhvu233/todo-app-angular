import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() color: string = '';
  @Input() text: string = '';
  colorClasses = {
    warning: false,
    success: false,
    danger: false,
    primary: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.colorClasses = {
      warning: this.color === 'warning',
      success: this.color === 'success',
      danger: this.color === 'danger',
      primary: this.color === 'primary',
    };
  }
}
