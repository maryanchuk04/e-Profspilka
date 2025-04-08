import { Injectable } from '@angular/core';

import { Role } from '../models/roles';
import { UserProvider } from './user.provider';

@Injectable({
    providedIn: 'root',
})
export class UserPermissionService {
    constructor(private userProvider: UserProvider) {}

    hasAccessToAdminPanel(): boolean {
        const user = this.userProvider.getCurrentUser();

        if (!user) {
            return false;
        }

        return user.roles.includes(Role.admin) || user.roles.includes(Role.moderator);
    }

    isAdmin(): boolean {
        const user = this.userProvider.getCurrentUser();

        if (!user) {
            return false;
        }

        return user.roles.includes(Role.admin);
    }
}
