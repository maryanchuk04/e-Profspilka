import { createSlice } from '@reduxjs/toolkit';

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
        handleOpen: (state) => {
            console.log('work')
            state.open = !state.open;
        },
    },
});

export const { handleOpen } = loginSlice.actions;

export const selectLoginState = (state: { login: LoginState }) => state.login.open;

export default loginSlice.reducer;