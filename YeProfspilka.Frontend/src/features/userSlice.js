import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	autorized: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {

	}
})

export const selectIsAuthorized = (state) => state.user.autorized;

export default userSlice.reducer;
