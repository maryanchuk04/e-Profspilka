import { AlertType } from '../store/reducers/alert.reducer';

export interface Alert {
	type?: AlertType;
	message?: string;
	autoClose?: boolean;
	duration?: number;
	open: boolean;
}
