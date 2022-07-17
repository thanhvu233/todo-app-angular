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

  private _refreshPage$ = new Subject<void>();

  get refreshPage$() {
    return this._refreshPage$;
  }

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + '/items');
  }

  addItem(item: Item) {
    return this.http
      .post<Item>(this.baseUrl + '/items', item)
      .pipe(tap(() => this._refreshPage$.next()));
  }
}
