import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from 'src/app/shared/badge/badge.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { CounterComponent } from './components/counter/counter.component';
import { FormComponent } from './components/form/form.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MainComponent } from './components/main/main.component';
import { TabComponent } from './components/tab/tab.component';
import { FormService } from './service/form.service';
import { TodoApiService } from './service/todo-api.service';
import { TodoService } from './service/todo.service';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [
    FormComponent,
    MainComponent,
    CounterComponent,
    ListItemComponent,
    TodoComponent,
    TabComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    BadgeComponent,
  ],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormComponent,
    MainComponent,
    CounterComponent,
    ListItemComponent,
    TodoComponent,
    TabComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
  ],
  providers: [TodoService, TodoApiService, FormService],
})
export class TodoModule {}
