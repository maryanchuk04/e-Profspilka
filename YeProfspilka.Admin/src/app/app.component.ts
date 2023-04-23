import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { TokenService } from './services/token.service';
import AppState from './store';
import { fetchCurrentUser } from './store/actions/user.action';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	title = 'YeProfspilka.Admin';

	constructor(
		private store: Store<AppState>,
		private tokenService: TokenService,
	) {}

	ngOnInit(): void {
		if (this.tokenService.get()) {
			this.store.dispatch(fetchCurrentUser());
		}
	}
}
