import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { ApplicationUrls } from "../utils/constants";

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            if (error.status === 401 && !window.location.href.includes(ApplicationUrls.authenticate)) {
                window.location.href = ApplicationUrls.authenticate;
            }

            return throwError(() => error);
        })
    );
}
