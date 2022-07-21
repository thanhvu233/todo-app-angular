import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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

  public isEdit: boolean = false;
  public itemId: number = 0;

  ngOnInit(): void {
    this._todoService.editItem$.subscribe(
      (tmpObj: { item: Item; isEdit: boolean }) => {
        this.addEditForm.setValue({
          name: tmpObj.item.name,
          due: tmpObj.item.due,
        });

        this.isEdit = tmpObj.isEdit;
        this.itemId = tmpObj.item.id;
      }
    );

    this._todoService.tabState$.subscribe({
      next: (tabState: string) => {
        this.tabState = tabState;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this._todoService.editItem.unsubscribe();
    this._todoService.tabState.unsubscribe();
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
