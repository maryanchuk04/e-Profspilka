import { TagModule } from 'primeng/tag';
import { Observable, of } from 'rxjs';
import { CurrentUser } from 'src/app/core/user.model';
import { UserProvider } from 'src/app/core/user.provider';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppState from 'src/app/store';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { ButtonComponent } from '../../ui/button/button.component';
import { RoleComponent } from '../role/role.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [NgIf, RoleComponent, ButtonComponent, NgFor, RouterLinkActive, RouterLink, AsyncPipe, TagModule]
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
	user$: Observable<CurrentUser>;
	constructor(private store: Store<AppState>, private authService: AuthenticateService, private userProvider: UserProvider) {}

	ngOnInit(): void {
		this.user$ = of(this.userProvider.getCurrentUser());
	}

	logout() {
		this.authService.logout();
	}
}
