import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        handleOpen: (state) => {
            state.open = !state.open;
        },
    },
});

export const { handleOpen } = loginSlice.actions;

export const selectLoginState = (state) => state.login;

export default loginSlice.reducer;
