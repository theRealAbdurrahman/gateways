import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {}

  /*
  I added the snackbar open function inside it's own zone
  because i encountered an error where the snackbar opened twice in some functions
*/

  showSnackbar(message: string, method: string, type: string, duration = 2000) {
    this.zone.run(() => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: { message: message, type: type },
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });
  }
}
