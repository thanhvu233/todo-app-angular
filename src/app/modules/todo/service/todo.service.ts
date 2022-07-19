import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { IResponse } from 'src/app/interfaces/response';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl: string = environment.baseUrl;

  private _refreshPage = new Subject<string>();
  refreshPage$ = this._refreshPage.asObservable();
 
  private _tabState = new Subject<string>();
  tabState$ = this._tabState.asObservable();

  private _editItem = new Subject<{ item: Item; isEdit: boolean }>();
  editItem$ = this._editItem.asObservable();

  constructor(private http: HttpClient) {}

  getAllItemsByAPI(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + '/items');
  }

  addItemByAPI(item: Item, tabState: string): Observable<Item> {
    return this.http
      .post<Item>(this.baseUrl + '/items', item)
      .pipe(tap(() => this._refreshPage.next(tabState)));
  }

  deleteItemByAPI(id: number): Observable<Item> {
    return this.http.delete<Item>(this.baseUrl + `/items/${id}`);
  }

  accomplishItemByAPI(item: Item): Observable<Item> {
    return this.http.put<Item>(this.baseUrl + `/items/${item.id}`, item);
  }

  getItemsByStatusByAPI(status: string): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + `/items?status=${status}`);
  }

  updateItemByAPI(item: Item): Observable<Item> {
    return this.http
      .put<Item>(this.baseUrl + `/items/${item.id}`, item)
      .pipe(tap(() => this._refreshPage.next()));
  }

  updateDeadlineByAPI(item: Item): Observable<Item> {
    return this.http
      .put<Item>(this.baseUrl + `/items/${item.id}`, { isWarning: true })
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
