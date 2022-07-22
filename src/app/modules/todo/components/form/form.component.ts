import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { TabState } from 'src/app/constants/tabState';
import { Item } from 'src/app/interfaces/item';
import { FormService } from '../../service/form.service';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  public tabState: string = TabState.ALL;
  @Input() public formTitle: string = 'Add';
  @Output() public closeFormEvent: EventEmitter<void> =
    new EventEmitter<void>();
  public isLoading: boolean = false;
  public isEdit: boolean = false;
  public addEditForm: FormGroup = this._formService.addEditForm;
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
    private _formService: FormService
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

    const isEditSubscription = this._formService.isEdit$.subscribe(
      (isEdit: boolean) => {
        this.isEdit = isEdit;
      }
    );

    const isLoadingSubscription = this._formService.isLoading$.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );

    const addEditFormSubscription = this._formService.addEditForm$.subscribe(
      (addEditForm: FormGroup) => {
        this.addEditForm = addEditForm;
      }
    );

    this.subscription.add(editItemSubscription);
    this.subscription.add(tabStateSubscription);
    this.subscription.add(isEditSubscription);
    this.subscription.add(isLoadingSubscription);
    this.subscription.add(addEditFormSubscription);
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
      this._formService.createItem(this.tabState, this.item);
    } else {
      this._formService.updateItem(this.tabState, this.item);
    }

    this.closeFormEvent.emit();
  }

  onCloseForm() {
    this.closeFormEvent.emit();
    this.isEdit = false;
    this.addEditForm.reset({ name: '', due: '' });
  }
}
