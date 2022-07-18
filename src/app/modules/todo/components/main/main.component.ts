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
  public totalItem: number = 0;
  public countItem: number = 0;
  public tabState: string = 'active';

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this._todoService.refreshPage$.subscribe(() => {
      this.getAllItems();
      this.getCountByStatus('active');
    });

    this.getAllItems();
    this.getCountByStatus('active');
  }

  private getAllItems(): void {
    this._todoService.getAllItems().subscribe({
      next: (response) => {
        this.itemArr = response.data;
        this.totalItem = response.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getItemsByStatus(status: string): void {
    this._todoService.getItemsByStatus(status).subscribe({
      next: (response) => {
        this.itemArr = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getCountByStatus(status: string): void {
    this._todoService.getItemsByStatus(status).subscribe({
      next: (response) => {
        this.countItem = response.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleDelete(id: number): void {
    this._todoService.deleteItem(id).subscribe({
      next: (data) => {
        this.itemArr = this.itemArr.filter((item) => item.id !== data.id);
        this.totalItem--;
        this.getCountByStatus(this.tabState);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleAccomplish(item: Item): void {
    let completedItem = { ...item, status: ItemStatus.COMPLETED };

    this._todoService.accomplishItem(completedItem).subscribe({
      next: (data) => {
        this.getCountByStatus(this.tabState);
        this.itemArr = this.itemArr.map((item: Item) => {
          if (item.id === data.id) {
            return { ...data };
          }

          return item;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleTabClick(status: string): void {
    if (status == 'all') {
      this.tabState = 'active';
    } else {
      this.tabState = status;
    }

    if (status == 'all') {
      this.getAllItems();
      this.getCountByStatus(this.tabState);
    } else {
      this.getItemsByStatus(status);
      this.getCountByStatus(this.tabState);
    }
  }

  handleEdit(item: Item): void {
    this._todoService.sendItem(item, true);
  }
}
