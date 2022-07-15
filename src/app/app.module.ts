import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { MainComponent } from './components/main/main.component';
import { CounterComponent } from './components/counter/counter.component';
import { FilterComponent } from './components/filter/filter.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MainComponent,
    CounterComponent,
    FilterComponent,
    ListItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
