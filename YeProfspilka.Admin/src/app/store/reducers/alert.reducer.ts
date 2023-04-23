import { createReducer, on } from '@ngrx/store';
import { Alert } from 'src/app/models/Alert';
import {
	closeAlert,
	showAlert,
	showDefaultAlert,
} from '../actions/alert.action';

export enum AlertType {
	Success = 'Success',
	Error = 'Error',
}

export const defaultAlert: Alert = {
	type: AlertType.Error,
	message: 'Вибачте! Щось пішло не так!',
	autoClose: true,
	duration: 4000,
	open: false,
};

export interface AlertState {
	data: Alert;
}

const initialState: AlertState = {
	data: defaultAlert,
};

export const alertReducer = createReducer<AlertState>(
	initialState,
	on(showDefaultAlert, (state) => ({
		...state,
		data: { ...defaultAlert, open: true },
	})),
	on(showAlert, (state, { alert }) => ({ ...state, data: alert })),
	on(closeAlert, (state) => ({
		...state,
		data: { ...state.data, open: false },
	})),
);
