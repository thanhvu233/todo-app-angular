import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() color: string = '';
  @Input() text?: string = '';
  @Input() iconSrc?: string = '';
  @Input() type?: string = 'button';
  @Input() size?: string = '';
  @Input() shape?: string = 'square';
  @Input() isDisabled?: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
