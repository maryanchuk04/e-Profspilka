import { Injectable, } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { accessTokenCookieName } from '../core/constants';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	constructor(private cookie: CookieService) {}

	getAccessToken(): string | null {
		return this.cookie.get(accessTokenCookieName);
	}

	remove(): void {
		this.cookie.deleteAll();
	}
}
