import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../services/token.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
	constructor(
		public router: Router,
		private tokenService: TokenService,
		private jwtHelper: JwtHelperService,
	) { }

	canActivate(): boolean {
		if (!this.tokenService.get()) {
			this.router.navigate(['authenticate']);
			return false;
		}
		return true;
	}
}
