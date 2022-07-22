import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { TodoApiService } from './todo-api.service';

@Injectable({
  providedIn: 'any',
})
export class FormService {
  public addEditForm = this.fb.group({
    name: ['', [Validators.required]],
    due: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private _todoAPIService: TodoApiService
  ) {}

  private _isLoading: Subject<boolean> = new Subject<boolean>();
  isLoading$: Observable<boolean> = this._isLoading.asObservable();

  private _isEdit: Subject<boolean> = new Subject<boolean>();
  isEdit$: Observable<boolean> = this._isEdit.asObservable();

  private _addEditForm: Subject<FormGroup> = new Subject<FormGroup>();
  addEditForm$: Observable<FormGroup> = this._addEditForm.asObservable();

  private _openEditForm: Subject<Item> = new Subject<Item>();
  openEditForm$: Observable<Item> = this._openEditForm.asObservable();

  // tabState parameter will let we know which tab view
  // will be rendered
  createItem(tabState: string, item: Item): void {
    this._todoAPIService.addItemByAPI(item, tabState).subscribe({
      next: () => {
        this.addEditForm.reset({ name: '', due: '' });
        this._isLoading.next(false);
        this._addEditForm.next(this.addEditForm);
      },
      error: (err) => {
        console.log(err);
        this._isLoading.next(false);
      },
    });
  }

  // tabState parameter will let we know which tab view
  // will be rendered
  updateItem(tabState: string, item: Item): void {
    this._todoAPIService.updateItemByAPI(item, tabState).subscribe({
      next: () => {
        this.addEditForm.reset({ name: '', due: '' });
        this._addEditForm.next(this.addEditForm);
        this._isEdit.next(false);
        this._isLoading.next(false);
      },
      error: (err) => {
        console.log(err);
        this._isLoading.next(false);
      },
    });
  }

  openEditForm(item: Item): void {
    this._openEditForm.next(item);
  }
}
