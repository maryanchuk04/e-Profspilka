import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

import { Injectable } from '@angular/core';

import { Role } from '../models/roles';
import { accessTokenCookieName } from './constants';
import { CurrentUser } from './user.model';

interface JwtPayload {
    'https://e-profspilka.com.ua/isActive': string;
    'https://e-profspilka.com.ua/userId': string;
    'https://e-profspilka.com.ua/fullName': string;
    'https://e-profspilka.com.ua/faculty': string;
    'https://e-profspilka.com.ua/email': string;
    'https://e-profspilka.com.ua/picture': string;
    'https://e-profspilka.com.ua/roles'?: Role[];
}

@Injectable({
    providedIn: 'root',
})
export class UserProvider {
    constructor(private cookieService: CookieService) {}

    public getCurrentUser(): CurrentUser | null {
        const token = this.cookieService.get(accessTokenCookieName);

        if (!token) {
            console.warn('JWT not found cookies.');
            return null;
        }

        try {
            const payload = jwtDecode<JwtPayload>(token);
            const isActive = payload['https://e-profspilka.com.ua/isActive'] === 'True';

            const user: CurrentUser = {
                userId: payload['https://e-profspilka.com.ua/userId'],
                fullName: payload['https://e-profspilka.com.ua/fullName'],
                faculty: payload['https://e-profspilka.com.ua/faculty'],
                isActive: isActive,
                email: payload['https://e-profspilka.com.ua/email'],
                picture: payload['https://e-profspilka.com.ua/picture'],
                roles: payload['https://e-profspilka.com.ua/roles'] ?? [],
            };

            return user;
        } catch (error) {
            console.error('Error in decoding JWT:', error);
            return null;
        }
    }
}
