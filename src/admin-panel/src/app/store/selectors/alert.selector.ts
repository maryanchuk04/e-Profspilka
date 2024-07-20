import { createSelector } from '@ngrx/store';
import { AppState } from '../AppState';
import { AlertState } from '../reducers/alert.reducer';

const selectAlert = (state: AppState) => state.alert;

export const selectAlertState = createSelector(
	selectAlert,
	(alert: AlertState) => alert.data,
);
