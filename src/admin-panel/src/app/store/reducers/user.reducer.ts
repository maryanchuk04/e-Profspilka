import { User, } from 'src/app/models/User';

import { createReducer, on, } from '@ngrx/store';

import {
	fetchAllUsers, fetchCurrentUserSuccess, fetchUsers, fetchUsersSuccess, loginUserSuccess,
	updateUser, updateUserSuccess,
} from '../actions/user.action';

const initialState: UserState = {
	data: null,
	users: [],
	loading: false,
};

export interface UserState {
	data: User;
	users: User[];
	loading: boolean;
}

export const userReducer = createReducer<UserState>(
	initialState,
	on(loginUserSuccess, (state, { user }) => ({ ...state, data: user })),
	on(fetchCurrentUserSuccess, (state, { user }) => ({
		...state,
		data: user,
	})),
	on(fetchUsers, (state) => ({ ...state, loading: true })),
	on(fetchUsersSuccess, (state, { users }) => ({ ...state, users: users, loading: false })),
	on(updateUser, (state) => ({ ...state, loading: true })),
	on(updateUserSuccess, (state, { user }) => {
		const users = [...state.users];
		const index = users.findIndex((x) => x.id === user.id);
		user = { ...users[index], facultet: user.facultet, course: user.course, role: user.role };
		if (index > -1) {
			users.splice(index, 1, user);
		}

		return {
			...state,
			loading: false,
			users,
		};
	}),
	on(fetchAllUsers, (state) => ({ ...state, loading: true }))
);
