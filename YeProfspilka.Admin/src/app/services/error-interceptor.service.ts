import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import AppState from '../store';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>, private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // Server Error
                    errorMessage = `Error Code: ${error.status}\Message: ${error.message}`;
                    if (error.status === HttpStatusCode.Forbidden) {
                        this.toastr.error('У вас немає доступу щоб виконати цю дію!');
                        return throwError(errorMessage);
                    } else {
                        this.toastr.error('Щось пішло не так!');
                    }
                }
                return throwError(errorMessage);
            })
        );
    }
}
