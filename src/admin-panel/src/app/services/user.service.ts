import { Injectable, } from '@angular/core';

import { Role, } from '../models/roles';
import { User, } from '../models/User';
import { RestService, } from './rest.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	url = 'user';
	constructor(private service: RestService<User>) {}

	getCurrentUser() {
		return this.service.getOne(this.url);
	}

	updateUser(user: User) {
		return this.service.put(`${this.url}`, user);
	}

	getUsers() {
		return this.service.getAll(`${this.url}/all`);
	}

	getUser(id: string) {
		return this.service.getOne(`student-store/${this.url}/${id}`);
	}
}
