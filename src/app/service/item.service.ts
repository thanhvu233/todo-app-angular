import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../interface/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl: string = 'https://62d1031fd9bf9f170590dfee.mockapi.io/api';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.baseUrl + '/items');
  }
}
