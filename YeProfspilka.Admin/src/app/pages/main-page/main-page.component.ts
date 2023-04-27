import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
	isAdminOrModerator: boolean;
	constructor(private tokenService: TokenService, private jwtHelper: JwtHelperService, private router: Router) { }

	ngOnInit(): void {
		const decodedToken = this.jwtHelper.decodeToken(this.tokenService.get());
		this.isAdminOrModerator = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Admin')
			|| decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Moderator');
	}

	handleNavigate() {
		window.open(environment.clientUrl);
	}
}
