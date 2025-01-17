import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserPermissionService } from '../core/user-permission.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuardService  {
	constructor(
		public router: Router,
		private userPermissionService: UserPermissionService,
	) { }

	canActivate(): boolean {
		return this.userPermissionService.isAdmin();
	}
}
