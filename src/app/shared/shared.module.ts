import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormErrorMessageComponent } from './form-error-message/form-error-message.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    BadgeComponent,
    ButtonComponent,
    ConfirmModalComponent,
    FormErrorMessageComponent,
    InputFieldComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    BadgeComponent,
    ButtonComponent,
    ConfirmModalComponent,
    FormErrorMessageComponent,
    InputFieldComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
