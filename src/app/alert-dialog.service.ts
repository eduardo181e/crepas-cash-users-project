import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  constructor(private dialog: MatDialog) {}

  mostrarAlerta(mensaje: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: { mensaje },
      position: { top: '43px' },
      width: '500px',
    });
  }
}