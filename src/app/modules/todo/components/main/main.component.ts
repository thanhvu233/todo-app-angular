import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { TabState } from 'src/app/constants/tabState';
import { Item } from 'src/app/interfaces/item';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public itemArr: Item[] = [];
  public totalItem: number = 0;
  public countItem: number = 0;
  public itemState: string = ItemStatus.ACTIVE;
  public tabState: string = TabState.ALL;

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this._todoService.refreshPage$.subscribe((tabState) => {
      if (tabState == TabState.ALL) {
        this.getAllItems();
        this.itemState = ItemStatus.ACTIVE;
        this.getItemCountByStatus(ItemStatus.ACTIVE);
      } else {
        this.itemState = tabState;
        this.getItemsByStatus(tabState);
        this.getTotalAmount();
        this.getItemCountByStatus(tabState);
      }
    });

    this.getAllItems();
    this.getItemCountByStatus(ItemStatus.ACTIVE);
  }

  ngOnDestroy(): void {
    this._todoService.refreshPage.unsubscribe();
  }

  handleDelete(id: number): void {
    this._todoService.deleteItemByAPI(id).subscribe({
      next: (data) => {
        this.itemArr = this.itemArr.filter((item) => item.id !== data.id);
        this.totalItem--;
        this.getItemCountByStatus(this.itemState);
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

    this._todoService
      .accomplishItemByAPI(completedItem, this.tabState)
      .subscribe({
        next: (data) => {},
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleTabClick(tabState: string): void {
    this.tabState = tabState;
    this._todoService.sendTabState(tabState);

    if (tabState == TabState.ALL) {
      this.itemState = ItemStatus.ACTIVE;
      this.getAllItems();
    } else {
      this.itemState = tabState;
      this.getItemsByStatus(tabState);
    }

    this.getItemCountByStatus(this.itemState);
  }

  handleEdit(item: Item): void {
    this._todoService.sendItem(item, true);
  }

  getItemsByStatus(status: string): void {
    this._todoService.getItemsByStatusByAPI(status).subscribe({
      next: (response) => {
        let updatedItem: Item;

        this.itemArr = response.map((item) => {
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getItemCountByStatus(status: string): void {
    this._todoService.getItemsByStatusByAPI(status).subscribe({
      next: (response) => {
        this.countItem = response.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTotalAmount(): void {
    this._todoService.getAllItemsByAPI().subscribe({
      next: (response) => {
        this.totalItem = response.length;
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

        this.itemArr = response.map((item) => {
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

        this.totalItem = response.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
