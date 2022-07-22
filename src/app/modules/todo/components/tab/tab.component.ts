import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TabState } from 'src/app/constants/tabState';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  public tabState: {
    all: boolean;
    active: boolean;
    completed: boolean;
  } = {
    all: true,
    active: false,
    completed: false,
  };

  @Output() tabEvent:EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickAll(): void {
    this.tabState = {
      all: true,
      active: false,
      completed: false,
    };
    this.tabEvent.emit(TabState.ALL);
  }

  onClickActive(): void {
    this.tabState = {
      all: false,
      active: true,
      completed: false,
    };
    this.tabEvent.emit(TabState.ACTIVE);
  }

  onClickCompleted(): void {
    this.tabState = {
      all: false,
      active: false,
      completed: true,
    };
    this.tabEvent.emit(TabState.COMPLETED);
  }
}
