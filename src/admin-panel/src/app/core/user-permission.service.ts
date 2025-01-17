import { Injectable } from '@angular/core';
import { UserProvider } from './user.provider';
import { Role } from '../models/roles';

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

        return user.role.includes(Role.Admin) || user.role.includes(Role.Moderator);
    }

    isAdmin(): boolean {
        const user = this.userProvider.getCurrentUser();

        if (!user) {
            return false;
        }

        return user.role.includes(Role.Admin);
    }
}
