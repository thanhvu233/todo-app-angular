import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterComponent } from './components/counter/counter.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormComponent } from './components/form/form.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MainComponent } from './components/main/main.component';
import { TodoComponent } from './todo.component';
import { TabComponent } from './components/tab/tab.component';

@NgModule({
  declarations: [
    FormComponent,
    MainComponent,
    CounterComponent,
    FilterComponent,
    ListItemComponent,
    TodoComponent,
    TabComponent,
  ],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormComponent,
    MainComponent,
    CounterComponent,
    FilterComponent,
    ListItemComponent,
    TodoComponent,
  ],
})
export class TodoModule {}
