import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Item } from 'src/app/interfaces/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any',
})
export class TodoApiService {
  baseUrl: string = environment.baseUrl;

  private _refreshPage: Subject<string> = new Subject<string>();
  refreshPage$: Observable<string> = this._refreshPage.asObservable();

  constructor(private http: HttpClient) {}

  get refreshPage() {
    return this._refreshPage;
  }

  getAllItemsByAPI(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + '/items');
  }

  addItemByAPI(item: Item, tabState: string): Observable<Item> {
    return this.http
      .post<Item>(this.baseUrl + '/items', item)
      .pipe(tap(() => this._refreshPage.next(tabState)));
  }

  deleteItemByAPI(id: number, tabState: string): Observable<Item> {
    return this.http
      .delete<Item>(this.baseUrl + `/items/${id}`)
      .pipe(tap(() => this._refreshPage.next(tabState)));
  }

  accomplishItemByAPI(item: Item, tabState: string): Observable<Item> {
    return this.http
      .put<Item>(this.baseUrl + `/items/${item.id}`, item)
      .pipe(tap(() => this._refreshPage.next(tabState)));
  }

  getItemsByStatusByAPI(status: string): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + `/items?status=${status}`);
  }

  updateItemByAPI(item: Item, tabState: string): Observable<Item> {
    return this.http
      .put<Item>(this.baseUrl + `/items/${item.id}`, item)
      .pipe(tap(() => this._refreshPage.next(tabState)));
  }

  updateDeadlineByAPI(item: Item): Observable<Item> {
    return this.http.put<Item>(this.baseUrl + `/items/${item.id}`, {
      isWarning: true,
    });
  }
}
