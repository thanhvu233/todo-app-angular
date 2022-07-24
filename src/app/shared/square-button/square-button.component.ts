import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ButtonSize } from 'src/app/constants/buttonSize';
import { ColorState } from 'src/app/constants/colorState';

@Component({
  selector: 'app-square-button',
  templateUrl: './square-button.component.html',
  styleUrls: ['./square-button.component.scss'],
})
export class SquareButtonComponent implements OnInit, OnChanges {
  @Input() size: string = '';
  @Input() color: string = '';
  @Input() text: string = '';
  @Input() isDisabled?: boolean = false;
  @Input() type?: string = 'button';
  classes: Object = {
    large: false,
    small: false,
    primary: false,
    danger: false,
    secondary: false,
    'is-disabled': false,
  };

  constructor() {}

  ngOnInit(): void {
    this.classes = {
      large: this.size === ButtonSize.LARGE,
      small: this.size === ButtonSize.SMALL,
      primary: this.color === ColorState.PRIMARY,
      danger: this.color === ColorState.DANGER,
      secondary: this.color === ColorState.SECONDARY,
      'is-disabled': this.isDisabled === true,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.classes = {
      ...this.classes,
      'is-disabled': changes.isDisabled?.currentValue === true,
    };
  }
}
