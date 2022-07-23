import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './modules/todo/todo.module';
import { ButtonComponent } from './shared/button/button.component';
import { InputFieldComponent } from './shared/input-field/input-field.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, InputFieldComponent],
  imports: [BrowserModule, AppRoutingModule, TodoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
