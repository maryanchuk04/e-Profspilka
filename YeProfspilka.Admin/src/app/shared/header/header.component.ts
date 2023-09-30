import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppState from 'src/app/store';
import { selectUserData } from 'src/app/store/selectors/user.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
	links = [
		{
			name: 'Модераційна',
			link: '/moderation/',
		},
		{
			name: 'Адміністрування',
			link: '/administration/',
		},
	];
	user$: Observable<User>;
	constructor(private store: Store<AppState>, private authService: AuthenticateService) {}

	ngOnInit(): void {
		this.user$ = this.store.select(selectUserData);
	}

	logout() {
		this.authService.logout();
	}
}
