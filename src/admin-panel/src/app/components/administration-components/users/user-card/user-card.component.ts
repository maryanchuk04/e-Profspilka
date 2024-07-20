import { Role, } from 'src/app/models/roles';
import { User, } from 'src/app/models/User';
import { UserService, } from 'src/app/services/user.service';
import AppState from 'src/app/store';
import { updateUser, } from 'src/app/store/actions/user.action';

import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Route, Router, } from '@angular/router';
import { Store, } from '@ngrx/store';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
	user: User = null;
	isEditMode = false;
	form: FormGroup;


	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private userService: UserService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(({ userId }) => {
			this.userService.getUser(userId).subscribe({
				next: (user) => {
					this.user = user;
					this.form = new FormGroup({
						facultet: new FormControl(this.user.facultet || '', Validators.required),
						course: new FormControl(this.user.course || 1, [
							Validators.required,
							Validators.min(1),
						]),
						role: new FormControl(this.user.role, Validators.required),
					});
				},
				error: (error) => {
					this.router.navigate(['/administration/users']);
				},
			});
		});
	}

	edit() {
		this.isEditMode = !this.isEditMode;
	}

	goBack() {
		this.router.navigate(['/administration/users']);
	}

	submit() {
		if (this.form.valid) {
			this.store.dispatch(
				updateUser({
					user: {
						...this.user,
						facultet: this.form.value.facultet,
						course: this.form.value.course,
						role: +this.form.value.role,
					},
				})
			);

			this.user = {
				...this.user,
				facultet: this.form.value.facultet,
				course: this.form.value.course,
				role: +this.form.value.role,
			};
		}
		this.isEditMode = false;
	}
}
