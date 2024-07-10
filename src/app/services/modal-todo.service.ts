import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoComponent } from '../layout/modal-todo/modal-todo.component';

@Injectable({
  providedIn: 'root'
})
export class ModalTodoService {

  constructor(private dialog: MatDialog) { }

  openDeleteModal(itemName: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '400px',
      data: { itemName }
    });

    return dialogRef.afterClosed().toPromise();
  }


}
