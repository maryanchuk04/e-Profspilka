import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import AppState from '../store';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private store: Store<AppState>,
		private toastr: ToastrService,
		private authService: AuthenticateService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler) {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
                console.log(error);
				let errorMessage = '';
				if (error.error instanceof ErrorEvent) {
					errorMessage = `Error: ${error.error.message}`;
				} else {
					// Server Error
					errorMessage = `Error Code: ${error.status}\Message: ${error.message}`;

					// Try refresh token for user
					if (error.status === HttpStatusCode.Unauthorized) {
						this.authService.refreshToken();
						return throwError(errorMessage);
					}

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
