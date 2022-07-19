import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ItemStatus } from 'src/app/constants/itemStatus';
import { Item } from 'src/app/models/item';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
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
  }

  onSubmit() {
    // Create function
    if (!this.isEdit) {
      const isWarning: boolean = this._todoService.checkDeadline(
        this.addEditForm.value.due,
        ItemStatus.ACTIVE
      );

      const item: Item = {
        ...this.addEditForm.value,
        status: ItemStatus.ACTIVE,
        isWarning: isWarning,
      };

      this._todoService.addItemByAPI(item).subscribe({
        next: () => {
          this.addEditForm.reset({ name: '', due: '' });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    // Update function
    else {
      const isWarning: boolean = this._todoService.checkDeadline(
        this.addEditForm.value.due,
        ItemStatus.ACTIVE
      );

      const item: Item = {
        id: this.itemId,
        status: ItemStatus.ACTIVE,
        isWarning: isWarning,
        ...this.addEditForm.value,
      };

      this._todoService.updateItemByAPI(item).subscribe({
        next: () => {
          this.addEditForm.reset({ name: '', due: '' });
          this.isEdit = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
