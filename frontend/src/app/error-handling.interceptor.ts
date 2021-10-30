import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SnackBarService } from './services/snackbar.service';
import { catchError } from 'rxjs/operators';
import { SnackBarState } from './components/snackbar/snackbar.component';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Error from error interceptor', err.error);
        // this for beautifying error obj from BE
        console.log(err);

        if (err.status !== 500) {
          this.snackBarService.showSnackbar(
            `${err.error.message}`,
            'Dismiss',
            SnackBarState.ERROR,
            6000
          );
        } else if (err.status === 500) {
          this.snackBarService.showSnackbar(
            `Server Error, please try again later`,
            'Dismiss',
            SnackBarState.ERROR,
            4000
          );
        }
        // raise error in the calling component
        return throwError(err);
      })
    );
  }
}
