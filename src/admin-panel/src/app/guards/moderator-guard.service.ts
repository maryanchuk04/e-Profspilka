import { Injectable } from '@angular/core';

import { UserPermissionService } from '../core/user-permission.service';

@Injectable({
	providedIn: 'root',
})
export class ModeratorGuardService  {
	constructor(
		private userPermissionService: UserPermissionService
	) { }

	canActivate(): boolean {
		return this.userPermissionService.hasAccessToAdminPanel();
	}
}
