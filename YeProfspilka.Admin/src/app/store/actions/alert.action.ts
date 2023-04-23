import { createAction, props } from '@ngrx/store';
import { Alert } from 'src/app/models/Alert';

export const showDefaultAlert = createAction('[Alert] Show default alert');

export const showAlert = createAction(
	'[Alert] Show alert',
	props<{ alert: Alert }>(),
);

export const closeAlert = createAction('[Alert] Close alert');
