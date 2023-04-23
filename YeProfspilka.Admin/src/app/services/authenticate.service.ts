import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { AuthenticateModel } from '../models/AuhenticateModel';
import { GoogleUserInfo } from '../models/GoogleUserInfo';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticateService {
	url: string = 'authenticate';
	constructor(private service: RestService<AuthenticateModel>) { }

	authenticate(authData: { email: string; password: string }) {
		this.service.post(this.url, authData).subscribe((resp) => {
			console.log(resp);
		});
	}

	authenticateGoogle(googleAuthModel: GoogleUserInfo) {
		return this.service.post(`${this.url}/google`, googleAuthModel).pipe(
			catchError((err) => {
				console.log(err);
				return EMPTY;
			}),
		);
	}
}
