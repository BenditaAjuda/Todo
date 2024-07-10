import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrl: './modal-todo.component.css'
})
export class ModalTodoComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  delete(): void {
    this.dialogRef.close(true);
  }

}
