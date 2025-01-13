import { EMPTY, Subject, takeUntil, } from 'rxjs';
import { GoogleUserInfo, } from 'src/app/models/GoogleUserInfo';
import AppState from 'src/app/store';
import { googleLoginUser, } from 'src/app/store/actions/user.action';

import {
	GoogleLoginProvider, SocialAuthService, SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';
import { Store, } from '@ngrx/store';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    standalone: false
})
export class LoginPageComponent implements OnInit, OnDestroy {
	socialUser!: SocialUser;
	destroy$: Subject<void> = new Subject();

	constructor(
		private socialAuthService: SocialAuthService,
		private store: Store<AppState>,
		private router: Router
	) {}

	ngOnInit(): void {
		this.socialAuthService.authState.pipe(takeUntil(this.destroy$)).subscribe((user) => {
			this.socialUser = user;
			const googleModel: GoogleUserInfo = {
				fullName: this.socialUser.name,
				avatar: this.socialUser.photoUrl,
				email: this.socialUser.email,
				hd: this.socialUser.email.substring(this.socialUser.email.lastIndexOf('@') + 1),
			};
			this.store.dispatch(googleLoginUser({ googleModel }));
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	loginGoogle() {
		this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => EMPTY);
	}
}
