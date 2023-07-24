import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Role } from 'src/app/models/roles';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import AppState from 'src/app/store';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
    user: User = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(({ userId }) => {
            this.userService.getUser(userId).subscribe({
                next: (user) => {
                    this.user = user;
                },
                error: (error) => {
                    this.router.navigate(['/administration/users']);
                },
            });
        });
    }

    submit() {
        // this.store.dispatch(updateUserRole({ body: { id: this.user.id, role: this.role } }));
        // this.close.emit();
    }
}
