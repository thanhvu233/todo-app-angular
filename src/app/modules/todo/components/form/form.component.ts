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

  ngOnInit(): void {}

  onSubmit() {
    const item: Item = { status: 'active', ...this.addEditForm.value };

    this._todoService.addItem(item).subscribe({
      next: (data) => {
        this.addEditForm.reset({ name: '', due: '' });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
