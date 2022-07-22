import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { FormService } from './service/form.service';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  public isAddEditFormOpen: boolean = false;
  public formTitle: string = 'Add';
  public subscription: Subscription = new Subscription();

  constructor(
    private _formService: FormService,
    private _todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.subscription = this._formService.openEditForm$.subscribe(
      (item: Item) => {
        this.handleOpenForm('Update');
        this._todoService.sendItem(item, true);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleCloseForm() {
    this.isAddEditFormOpen = false;
  }

  handleOpenForm(formTitle: string): void {
    this.isAddEditFormOpen = true;
    this.formTitle = formTitle;
  }
}
