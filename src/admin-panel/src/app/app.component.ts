import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenService } from './services/token.service';
import AppState from './store';
import { fetchCurrentUser } from './store/actions/user.action';
import { AlertComponent } from './components/alert/alert.component';
import { RouterOutlet } from '@angular/router';
import { UserProvider } from './core/user.provider';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [AlertComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
    title = 'YeProfspilka.Admin';

    constructor(private store: Store<AppState>, private tokenService: TokenService, private userProvider: UserProvider) {}

    ngOnInit(): void {
        if (this.tokenService.getAccessToken()) {
            this.store.dispatch(fetchCurrentUser());
        }

        console.log(this.userProvider.getCurrentUser());
    }
}
