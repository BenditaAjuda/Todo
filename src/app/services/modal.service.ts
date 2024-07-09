import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../layout/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openDeleteModal(itemName: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { itemName }
    });

    return dialogRef.afterClosed().toPromise();
  }

}
