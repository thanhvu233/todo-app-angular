import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
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
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    FormComponent,
    MainComponent,
    CounterComponent,
    ListItemComponent,
    TodoComponent,
    TabComponent,
  ],
  providers: [TodoService, TodoApiService, FormService],
})
export class TodoModule {}
