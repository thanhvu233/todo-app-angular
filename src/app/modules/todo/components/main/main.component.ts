import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { TabState } from 'src/app/constants/tabState';
import { Item } from 'src/app/interfaces/item';
import { TodoApiService } from '../../service/todo-api.service';
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
  public isLoading: boolean = false;
  public isConfirmModalOpen: boolean = false;
  public itemId: number = 0;
  subscription: Subscription = new Subscription();

  constructor(
    private _todoService: TodoService,
    private _todoAPIService: TodoApiService
  ) {}

  ngOnInit(): void {
    const refreshPageSubscription = this._todoAPIService.refreshPage$.subscribe(
      (tabState) => {
        if (tabState == TabState.ALL) {
          this._todoService.getAllItems();
          this.itemState = ItemStatus.ACTIVE;
          this._todoService.getItemCountByStatus(ItemStatus.ACTIVE);
        } else {
          this.itemState = tabState;
          this._todoService.getItemsByStatus(tabState);
          this._todoService.getTotalAmount();
          this._todoService.getItemCountByStatus(tabState);
        }
      }
    );

    const itemArrSubscription = this._todoService.itemArr$.subscribe(
      (itemArr) => {
        this.itemArr = itemArr;
      }
    );
    const totalItemSubscription = this._todoService.totalItem$.subscribe(
      (totalItem) => {
        this.totalItem = totalItem;
      }
    );
    const countItemSubscription = this._todoService.countItem$.subscribe(
      (countItem) => {
        this.countItem = countItem;
      }
    );
    const itemByStatusArrSubscription =
      this._todoService.itemByStatusArr$.subscribe((itemArr) => {
        this.itemArr = itemArr;
      });

    this._todoService.getAllItems();
    this._todoService.getItemCountByStatus(ItemStatus.ACTIVE);

    this.subscription.add(refreshPageSubscription);
    this.subscription.add(itemArrSubscription);
    this.subscription.add(totalItemSubscription);
    this.subscription.add(countItemSubscription);
    this.subscription.add(itemByStatusArrSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleDeleteClick(id: number): void {
    this.isConfirmModalOpen = true;
    this.itemId = id;
  }

  handleAccomplish(item: Item): void {
    let completedItem = {
      ...item,
      status: ItemStatus.COMPLETED,
      isWarning: false,
    };

    this.isLoading = true;

    this._todoAPIService
      .accomplishItemByAPI(completedItem, this.tabState)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  handleTabClick(tabState: string): void {
    this.tabState = tabState;
    this._todoService.sendTabState(tabState);

    if (tabState == TabState.ALL) {
      this.itemState = ItemStatus.ACTIVE;
      this._todoService.getAllItems();
    } else {
      this.itemState = tabState;
      this._todoService.getItemsByStatus(tabState);
    }

    this._todoService.getItemCountByStatus(this.itemState);
  }

  handleEdit(item: Item): void {
    this._todoService.sendItem(item, true);
  }

  handleCloseConfirmDelete(): void {
    this.isConfirmModalOpen = false;
  }

  handleDeleteItem(): void {
    this.handleCloseConfirmDelete();
    this.isLoading = true;

    this._todoAPIService.deleteItemByAPI(this.itemId, this.tabState).subscribe({
      next: (data) => {
        if (this.tabState == TabState.ALL) {
          this._todoAPIService.getAllItemsByAPI();
        } else {
          this._todoService.getItemsByStatus(this.tabState);
        }

        this._todoService.getItemCountByStatus(this.itemState);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
