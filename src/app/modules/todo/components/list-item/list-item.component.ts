import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() public itemArr: Item[] = [];
  @Output() deleteEvent = new EventEmitter();
  @Output() accomplishEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(id: number): void {
    this.deleteEvent.emit(id);
  }

  onAccomplish(item: Item): void {
    this.accomplishEvent.emit(item);
  }

  onEdit(item: Item): void {
    this.editEvent.emit(item);
  } 
}
