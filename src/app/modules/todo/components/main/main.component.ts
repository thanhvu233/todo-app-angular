import { Component, OnInit } from '@angular/core';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { Item } from 'src/app/models/item';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public itemArr: Item[] = [];
  public countItem: number = 0;

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this._todoService.refreshPage$.subscribe({
      next: (data) => {
        this.getAllItems();
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.getAllItems();
  }

  private getAllItems(): void {
    this._todoService.getAllItems().subscribe({
      next: (response) => {
        this.itemArr = response.data;
        this.countItem = response.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleDelete(id: number): void {
    this._todoService.deleteItem(id).subscribe({
      next: () => {
        console.log('Delete Successfully!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleAccomplish(item: Item): void {
    item = { ...item, status: ItemStatus.COMPLETED };

    this._todoService.accomplishItem(item).subscribe({
      next: () => {
        console.log('Completed!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
