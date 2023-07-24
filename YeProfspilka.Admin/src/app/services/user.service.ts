import { Injectable } from '@angular/core';

import { Role } from '../models/roles';
import { User } from '../models/User';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url = 'user';
    constructor(private service: RestService<User>) {}

    getCurrentUser() {
        return this.service.getOne(this.url);
    }

    getCurrentUserWithToken(token: string) {
        return this.service.getWithToken(this.url, token);
    }

    updateUserRole(id: string, role: Role) {
        return this.service.put(`${this.url}/role`, { id, role: +role } as User);
    }

    getUsers() {
        return this.service.getAll(`${this.url}/all`);
    }

    getUser(id: string) {
        return this.service.getOne(`student-store/${this.url}/${id}`);
    }
}
