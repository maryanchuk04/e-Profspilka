import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';

import { AuthenticateModel } from '../models/AuhenticateModel';
import { GoogleUserInfo } from '../models/GoogleUserInfo';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticateService {
    url: string = 'authenticate';
    constructor(private service: RestService<AuthenticateModel>, private toastr: ToastrService) {}

    authenticate(authData: { email: string; password: string }) {
        this.service.post(this.url, authData);
    }

    authenticateGoogle(googleAuthModel: GoogleUserInfo) {
        return this.service.post(`${this.url}/google`, googleAuthModel).pipe(
            catchError((err) => {
                // this.toastr.error('Щось пішло не так!');
                return EMPTY;
            })
        );
    }
}
