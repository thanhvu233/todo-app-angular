import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() public itemArr: Item[] = [];
  @Output() deleteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(id: number): void {
    this.deleteEvent.emit(id);
  }
}
