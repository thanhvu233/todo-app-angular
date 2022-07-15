import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  public itemArr: {
    id: number;
    name: string;
    due: string;
    status: 'active' | 'completed' | 'warning';
  }[] = [];

  public errMsg: string = '';

  constructor(private _itemService: ItemService) {}

  ngOnInit(): void {
    this._itemService.getAllItems().subscribe({
      next: (data) => (this.itemArr = data),
      error: (err) => (this.errMsg = err),
    });
  }
}
