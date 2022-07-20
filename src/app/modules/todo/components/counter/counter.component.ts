import { Component, Input, OnInit } from '@angular/core';
import { ItemStatus } from 'src/app/constants/itemStatus';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() public totalItem: number = 0;
  @Input() public countItem: number = 0;
  @Input() public itemState: string = ItemStatus.ACTIVE;

  constructor() {}

  ngOnInit(): void {}
}
