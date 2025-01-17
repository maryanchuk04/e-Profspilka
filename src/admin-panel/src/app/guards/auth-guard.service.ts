import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ApplicationUrls } from '../utils/constants';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    constructor(public router: Router, private tokenService: TokenService) {}

    canActivate(): boolean {
        if (!this.tokenService.getAccessToken()) {
            this.router.navigate([ApplicationUrls.authenticate]);
            return false;
        }
        return true;
    }
}
