import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { TokenService } from '../services/token.service';

@Injectable({
	providedIn: 'root',
})
export class ModeratorGuardService implements CanActivate {
	constructor(
		public router: Router,
		private tokenService: TokenService,
		private jwtHelper: JwtHelperService,
	) { }

	canActivate(): boolean {
		const decodedToken = this.jwtHelper.decodeToken(this.tokenService.get());
		return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Admin')
			|| decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Moderator');
	}
}