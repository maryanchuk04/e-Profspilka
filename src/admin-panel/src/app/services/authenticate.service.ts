import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, first } from 'rxjs';

import { Injectable } from '@angular/core';

import { AuthenticateModel } from '../models/AuhenticateModel';
import { GoogleUserInfo } from '../models/GoogleUserInfo';
import { RestService } from './rest.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticateService {
    url: string = 'authenticate';

    constructor(
        private service: RestService<AuthenticateModel>,
        private toastr: ToastrService,
        private tokenService: TokenService
    ) {}

    authenticate(authData: { email: string; password: string }) {
        this.service.post(this.url, authData);
    }

    authenticateGoogle(googleAuthModel: GoogleUserInfo) {
        return this.service.post(`${this.url}/google`, googleAuthModel).pipe(
            catchError((err) => {
                console.error('[Google] An error occurred during authentication', err);
                this.toastr.error('Щось пішло не так під час авторизації!');
                return EMPTY;
            })
        );
    }

    refreshToken() {
        this.tokenService.remove();
        this.service
            .post(`${this.url}/refresh-token`)
            .pipe(first())
            .subscribe({
                next: (authModel) => {},
                error: (err) => {
                    console.info(err);
                },
            });
    }

    logout() {
        this.tokenService.remove();
        window.location.reload();
    }
}
