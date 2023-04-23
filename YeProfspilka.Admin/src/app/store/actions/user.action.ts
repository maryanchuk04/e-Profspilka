import { GoogleUserInfo } from 'src/app/models/GoogleUserInfo';
import { User } from 'src/app/models/User';

import { createAction, props } from '@ngrx/store';

export const googleLoginUser = createAction(
	'[USER] google login user',
	props<{ googleModel: GoogleUserInfo }>(),
);

export const googleLoginUserSuccess = createAction(
	'[USER] Google login success',
	props<{ token: string }>()
)

export const loginUserSuccess = createAction(
	'[USER] Login user success',
	props<{ user: User }>(),
);

export const fetchCurrentUser = createAction('[USER] Get current user pending');

export const fetchCurrentUserSuccess = createAction(
	'[USER] Get current user Success',
	props<{ user: User }>(),
);
