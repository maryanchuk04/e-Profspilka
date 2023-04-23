import { Role } from 'src/app/models/roles';
import { User } from 'src/app/models/User';
import AppState from 'src/app/store';
import { updateUserRole } from 'src/app/store/actions/user.action';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
	@Input() user: User;
	@Output() close: EventEmitter<any> = new EventEmitter();
	role: Role;


	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		this.role = this.user.role;
	}

	submit() {
		this.store.dispatch(updateUserRole({ body: { id: this.user.id, role: this.role } }))
		this.close.emit()
	}
}
