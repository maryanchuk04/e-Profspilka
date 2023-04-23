import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import AppState from 'src/app/store';
import { selectUserData } from 'src/app/store/selectors/user.selector';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
	links = [
		{
			name: 'Модераційна',
			link: '/moderation',
		},
		{
			name: 'Адміністрування',
			link: '/administration',
		},
	];
	user$: Observable<User>;
	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.user$ = this.store.select(selectUserData);
	}
}
