import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


export enum SnackBarState {
  SUCCESS = 'sucess-snackbar',
  ERROR = 'failed-snackbar'
}


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor (

    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, type: string },

    private _snackRef: MatSnackBarRef<SnackbarComponent>) { }

  success() {
    return this.data.type == SnackBarState.SUCCESS ? true : false;
  }

}
