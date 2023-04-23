import { exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { StudentStoreService } from 'src/app/services/student-store.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { showAlert } from '../actions/alert.action';
import {
    fetchAllUsers, fetchCurrentUser, fetchCurrentUserSuccess, fetchUsers, fetchUsersSuccess,
    googleLoginUser, googleLoginUserSuccess, loginUserSuccess, updateUserRole, updateUserRoleSuccess
} from '../actions/user.action';
import { AppState } from '../AppState';
import { AlertType } from '../reducers/alert.reducer';

@Injectable()
export class UserEffect {
	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private authService: AuthenticateService,
		private userService: UserService,
		private tokenService: TokenService,
		private router: Router,
		private studentStore: StudentStoreService
	) { }

	authUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(googleLoginUser),
			switchMap(({ googleModel }) =>
				this.authService.authenticateGoogle(googleModel).pipe(
					map(({ token }) => {
						this.tokenService.set(token);
						return googleLoginUserSuccess({ token });
					}),
				),
			),
		),
	);

	getCurrentUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(googleLoginUserSuccess),
			switchMap(({ token }) =>
				this.userService.getCurrentUserWithToken(token).pipe(
					map((user) => {
						this.store.dispatch(
							showAlert({
								alert: {
									type: AlertType.Success,
									message: `Вітаю вас ${user.fullName}!`,
									open: true,
								},
							})
						);
						return loginUserSuccess({ user });
					}),
					tap(() => this.router.navigate(['/']))
				)
			)
		)
	);

	fetchUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchCurrentUser),
			exhaustMap(() =>
				this.userService
					.getCurrentUser()
					.pipe(map((user) => fetchCurrentUserSuccess({ user }))),
			),
		),
	);

	updateUserRole$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateUserRole),
			exhaustMap(({ body }) => this.userService.updateUserRole(body.id, body.role)
				.pipe(
					map((user) => updateUserRoleSuccess({ user }))
				)
			)
		)
	)

	fetchUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchUsers),
			exhaustMap(() =>
				this.userService
					.getUsers()
					.pipe(
						map((users) =>
							fetchUsersSuccess({ users }),
						),
					),
			),
		)
	)

	fetchAllUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchAllUsers),
			exhaustMap(() =>
				this.studentStore
					.getAll()
					.pipe(
						map((users) =>
							fetchUsersSuccess({ users }),
						),
					),
			),
		)
	)
}
