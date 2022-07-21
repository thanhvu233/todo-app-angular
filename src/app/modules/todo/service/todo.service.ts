import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { Item } from 'src/app/interfaces/item';
import { TodoApiService } from './todo-api.service';

@Injectable({ providedIn: 'any' })
export class TodoService {
  public itemArr: Item[] = [];
  public countItem: number = 0;
  public totalItem: number = 0;

  constructor(private _todoAPIService: TodoApiService) {}

  private _tabState: Subject<string> = new Subject<string>();
  tabState$: Observable<string> = this._tabState.asObservable();

  private _editItem: Subject<{ item: Item; isEdit: boolean }> = new Subject<{
    item: Item;
    isEdit: boolean;
  }>();
  editItem$: Observable<{
    item: Item;
    isEdit: boolean;
  }> = this._editItem.asObservable();

  private _itemArr: Subject<Item[]> = new Subject<Item[]>();
  itemArr$: Observable<Item[]> = this._itemArr.asObservable();

  private _itemByStatusArr: Subject<Item[]> = new Subject<Item[]>();
  itemByStatusArr$: Observable<Item[]> = this._itemByStatusArr.asObservable();

  private _countItem: Subject<number> = new Subject<number>();
  countItem$: Observable<number> = this._countItem.asObservable();

  private _totalItem: Subject<number> = new Subject<number>();
  totalItem$: Observable<number> = this._totalItem.asObservable();

  getItemsByStatus(status: string): void {
    this._todoAPIService.getItemsByStatusByAPI(status).subscribe({
      next: (response) => {
        let updatedItem: Item;

        this.itemArr = response.map((item) => {
          const isWarning = this.checkDeadline(item.due, item.status);

          if (isWarning) {
            updatedItem = { ...item, isWarning: isWarning };

            this._todoAPIService
              .updateDeadlineByAPI(updatedItem)
              .subscribe(() => {});
            return updatedItem;
          }

          return item;
        });

        this._itemByStatusArr.next(this.itemArr);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getItemCountByStatus(status: string): void {
    this._todoAPIService.getItemsByStatusByAPI(status).subscribe({
      next: (response) => {
        this.countItem = response.length;

        this._countItem.next(this.countItem);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTotalAmount(): void {
    this._todoAPIService.getAllItemsByAPI().subscribe({
      next: (response) => {
        this.totalItem = response.length;

        this._totalItem.next(this.totalItem)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllItems(): void {
    this._todoAPIService.getAllItemsByAPI().subscribe({
      next: (response) => {
        let updatedItem: Item;

        this.itemArr = response.map((item) => {
          const isWarning = this.checkDeadline(item.due, item.status);

          if (isWarning) {
            updatedItem = { ...item, isWarning: isWarning };

            this._todoAPIService
              .updateDeadlineByAPI(updatedItem)
              .subscribe(() => {});
            return updatedItem;
          }

          return item;
        });

        this.totalItem = response.length;

        this._itemArr.next(this.itemArr);
        this._totalItem.next(this.totalItem);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendItem(item: Item, isEdit: boolean): void {
    this._editItem.next({ item: item, isEdit: isEdit });
  }

  sendTabState(tabState: string): void {
    this._tabState.next(tabState);
  }

  checkDeadline(due: string, currentStatus: string): boolean {
    const dateNow: number = Date.now();
    const deadline: number = new Date(due).getTime();

    let diff: number = (dateNow - deadline) / 1000;
    diff /= 60 * 60;

    if (
      parseFloat(diff.toFixed(2)) >= -1 &&
      currentStatus !== ItemStatus.COMPLETED
    ) {
      return true;
    }

    return false;
  }
}
