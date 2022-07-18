import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IResponse } from 'src/app/interfaces/response';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl: string = environment.baseUrl;

  private _refreshPage = new Subject<void>();
  refreshPage$ = this._refreshPage.asObservable();

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + '/items');
  }

  addItem(item: Item) {
    return this.http
      .post<Item>(this.baseUrl + '/items', item)
      .pipe(tap(() => this._refreshPage.next()));
  }

  deleteItem(id: number) {
    return this.http.delete<Item>(this.baseUrl + `/items/${id}`);
  }

  accomplishItem(item: Item) {
    return this.http.put<Item>(this.baseUrl + `/items/${item.id}`, item);
  }

  getItemsByStatus(status: string): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + `/items?status=${status}`);
  }
}
