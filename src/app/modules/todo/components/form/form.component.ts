import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { TabState } from 'src/app/constants/tabState';
import { Item } from 'src/app/interfaces/item';
import { TodoApiService } from '../../service/todo-api.service';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  public tabState: string = TabState.ALL;
  public isLoading: boolean = false;
  public isEdit: boolean = false;
  public addEditForm = this.fb.group({
    name: ['', [Validators.required]],
    due: ['', [Validators.required]],
  });
  public item: Item = {
    name: '',
    due: '',
    status: ItemStatus.ACTIVE,
    isWarning: false,
    id: 0,
  };
  subscription: Subscription = new Subscription();

  get name(): AbstractControl | null {
    return this.addEditForm.get('name');
  }

  get due(): AbstractControl | null {
    return this.addEditForm.get('due');
  }

  constructor(
    private _todoService: TodoService,
    private _todoAPIService: TodoApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const editItemSubscription = this._todoService.editItem$.subscribe(
      (tmpObj: { item: Item; isEdit: boolean }) => {
        this.addEditForm.setValue({
          name: tmpObj.item.name,
          due: tmpObj.item.due,
        });

        this.isEdit = tmpObj.isEdit;
        this.item = { ...this.item, ...tmpObj.item };
      }
    );

    const tabStateSubscription = this._todoService.tabState$.subscribe({
      next: (tabState: string) => {
        this.tabState = tabState;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subscription.add(editItemSubscription);
    this.subscription.add(tabStateSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const isWarning: boolean = this._todoService.checkDeadline(
      this.addEditForm.value.due,
      ItemStatus.ACTIVE
    );

    this.item = {
      ...this.item,
      ...this.addEditForm.value,
      isWarning: isWarning,
    };

    this.isLoading = true;

    if (!this.isEdit) {
      this.createItem(this.tabState, this.item);
    } else {
      this.updateItem(this.tabState, this.item);
    }
  }

  // tabState parameter will let we know which tab view
  // will be rendered
  createItem(tabState: string, item: Item): void {
    this._todoAPIService.addItemByAPI(item, tabState).subscribe({
      next: () => {
        this.addEditForm.reset({ name: '', due: '' });
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  // tabState parameter will let we know which tab view
  // will be rendered
  updateItem(tabState: string, item: Item): void {
    this._todoAPIService.updateItemByAPI(item, tabState).subscribe({
      next: () => {
        this.addEditForm.reset({ name: '', due: '' });
        this.isEdit = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
