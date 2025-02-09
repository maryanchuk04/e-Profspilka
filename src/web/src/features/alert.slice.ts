import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertType } from '../models/alert';


interface AlertState {
    open: boolean;
    text: string;
    type: AlertType;
    duration: number;
}

const initialState: AlertState = {
    open: false,
    text: 'Шось пішло не так!',
    type: AlertType.Error,
    duration: 3000,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<AlertState>) => {
            state.duration = action.payload.duration;
            state.type = action.payload.type;
            state.text = action.payload.text;
            state.open = action.payload.open;
        },
        toggleAlert: (state) => {
            state.open = !state.open;
        },
        closeAlert: (state) => {
            state.open = false;
        },
        showDefaultAlert: (state) => {
            state.duration = initialState.duration;
            state.text = initialState.text;
            state.type = initialState.type;
            state.open = true;
        },
    },
});

export const { closeAlert, toggleAlert, showDefaultAlert, showAlert } = alertSlice.actions;

export const selectAlertState = (state: { alert: AlertState }) => state.alert;

export default alertSlice.reducer;