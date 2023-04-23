import { catchError } from 'rxjs';

import { Injectable } from '@angular/core';

import { User } from '../models/User';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	url = 'user';
	constructor(private service: RestService<User>) { }

	getCurrentUser() {
		return this.service.getOne(this.url);
	}

	getCurrentUserWithToken(token: string) {
		return this.service.getWithToken(this.url, token);
	}
}
