import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { TabState } from 'src/app/constants/tabState';
import { Item } from 'src/app/interfaces/item';
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
  public itemId: number = 0;
  subscription: Subscription = new Subscription();

  constructor(private _todoService: TodoService, private fb: FormBuilder) {}

  public addEditForm = this.fb.group({
    name: ['', [Validators.required]],
    due: ['', [Validators.required]],
  });

  get name(): AbstractControl | null {
    return this.addEditForm.get('name');
  }

  get due(): AbstractControl | null {
    return this.addEditForm.get('due');
  }

  ngOnInit(): void {
    const editItemSubscription = this._todoService.editItem$.subscribe(
      (tmpObj: { item: Item; isEdit: boolean }) => {
        this.addEditForm.setValue({
          name: tmpObj.item.name,
          due: tmpObj.item.due,
        });

        this.isEdit = tmpObj.isEdit;
        this.itemId = tmpObj.item.id;
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

    this.isLoading = true;

    if (!this.isEdit) {
      this.createItem(isWarning);
    } else {
      this.updateItem(isWarning);
    }
  }

  createItem(isWarning: boolean): void {
    const item: Item = {
      ...this.addEditForm.value,
      status: ItemStatus.ACTIVE,
      isWarning: isWarning,
    };

    // tabState parameter will let we know which tab view
    // will be rendered
    this._todoService.addItemByAPI(item, this.tabState).subscribe({
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

  updateItem(isWarning: boolean): void {
    const item: Item = {
      id: this.itemId,
      status: ItemStatus.ACTIVE,
      isWarning: isWarning,
      ...this.addEditForm.value,
    };

    this._todoService.updateItemByAPI(item, this.tabState).subscribe({
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
