import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() public isConfirmModalOpen: boolean = false;
  @Output() public closeModalEvent = new EventEmitter<void>();
  @Output() public deleteEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onCloseDeleteConfirm(): void {
    this.closeModalEvent.emit();
  }

  onDelete(): void {
    this.deleteEvent.emit();
  }
}
