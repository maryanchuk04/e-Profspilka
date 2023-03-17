import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: [],
}

export const fetchEvents = createAsyncThunk(
	'events/fetchEvents',
	async (_, { fulfillWithValue }) => {
		try {

		} catch (error) {

		}
	}
)

const eventsSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
	},
	extraReducers: {
		[fetchEvents.fulfilled]: (state, action) => {
			state.data = action.payload;
		}
	}
})

export const selectIsAuthorized = (state) => state.user.autorized;

export default userSlice.reducer;
