import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
    open: boolean;
}

const initialState: LoginState = {
    open: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        toggleLoginState: (state) => {
            state.open = !state.open;
        },
        setLoginState: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
    },
});

export const { toggleLoginState, setLoginState } = loginSlice.actions;

export const selectLoginState = (state: { login: LoginState }): boolean => state.login.open;

export default loginSlice.reducer;