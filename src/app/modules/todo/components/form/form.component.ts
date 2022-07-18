import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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
      (obj: { item: Item; isEdit: boolean }) => {
        this.addEditForm.setValue({
          name: obj.item.name,
          due: obj.item.due,
        });

        this.isEdit = obj.isEdit;
        this.itemId = obj.item.id;
      }
    );
  }

  onSubmit() {
    if (!this.isEdit) {
      const item: Item = { status: 'active', ...this.addEditForm.value };

      this._todoService.addItem(item).subscribe({
        next: () => {
          this.addEditForm.reset({ name: '', due: '' });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      const item: Item = {
        id: this.itemId,
        status: 'active',
        ...this.addEditForm.value,
      };

      this._todoService.updateItem(item).subscribe({
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
