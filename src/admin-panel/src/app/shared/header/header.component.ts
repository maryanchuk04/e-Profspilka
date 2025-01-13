import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppState from 'src/app/store';
import { selectUserData } from 'src/app/store/selectors/user.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { RoleComponent } from '../role/role.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [NgIf, RoleComponent, ButtonComponent, NgFor, RouterLinkActive, RouterLink, AsyncPipe]
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
