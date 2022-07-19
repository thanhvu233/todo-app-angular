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
  public itemState: string = ItemStatus.ACTIVE;

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this._todoService.refreshPage$.subscribe((tabState) => {
      // this.getAllItems();
      // this.getCountByStatus(ItemStatus.ACTIVE);

      if (tabState == 'all') {
        this.getAllItems();
        this.itemState = ItemStatus.ACTIVE;
        this.getCountByStatus(ItemStatus.ACTIVE);
      } else {
        this.itemState = tabState;
        this.getItemsByStatus(tabState);
        this.getCountByStatus(tabState);
      }
    });

    this.getAllItems();
    this.getCountByStatus(ItemStatus.ACTIVE);
  }

  handleDelete(id: number): void {
    this._todoService.deleteItemByAPI(id).subscribe({
      next: (data) => {
        this.itemArr = this.itemArr.filter((item) => item.id !== data.id);
        this.totalItem--;
        this.getCountByStatus(this.itemState);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleAccomplish(item: Item): void {
    let completedItem = {
      ...item,
      status: ItemStatus.COMPLETED,
      isWarning: false,
    };

    this._todoService.accomplishItemByAPI(completedItem).subscribe({
      next: (data) => {
        this.getCountByStatus(this.itemState);
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

  handleTabClick(tabState: string): void {
    this._todoService.sendTabState(tabState);

    if (tabState == 'all') {
      this.itemState = ItemStatus.ACTIVE;
      this.getAllItems();
    } else {
      this.itemState = tabState;
      this.getItemsByStatus(tabState);
    }

    this.getCountByStatus(this.itemState);
  }

  handleEdit(item: Item): void {
    this._todoService.sendItem(item, true);
  }

  getItemsByStatus(status: string): void {
    this._todoService.getItemsByStatusByAPI(status).subscribe({
      next: (response) => {
        let updatedItem: Item;

        this.itemArr = response.data.map((item) => {
          const isWarning = this._todoService.checkDeadline(
            item.due,
            item.status
          );

          if (isWarning) {
            updatedItem = { ...item, isWarning: isWarning };

            this._todoService
              .updateDeadlineByAPI(updatedItem)
              .subscribe(() => {});
            return updatedItem;
          }

          return item;
        });

        this.totalItem = response.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCountByStatus(status: string): void {
    this._todoService.getItemsByStatusByAPI(status).subscribe({
      next: (response) => {
        this.countItem = response.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllItems(): void {
    this._todoService.getAllItemsByAPI().subscribe({
      next: (response) => {
        let updatedItem: Item;

        this.itemArr = response.data.map((item) => {
          const isWarning = this._todoService.checkDeadline(
            item.due,
            item.status
          );

          if (isWarning) {
            updatedItem = { ...item, isWarning: isWarning };

            this._todoService
              .updateDeadlineByAPI(updatedItem)
              .subscribe(() => {});
            return updatedItem;
          }

          return item;
        });

        this.totalItem = response.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
