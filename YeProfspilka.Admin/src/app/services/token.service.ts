import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../utils/constants';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	constructor() {}

	get(): string | null {
		return localStorage.getItem(TOKEN_KEY);
	}

	set(token: string): void {
		localStorage.setItem(TOKEN_KEY, token);
	}
}
