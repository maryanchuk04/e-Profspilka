import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventService } from "../services/EventService";

const initialState = {
	data: [],
}

export const fetchEvents = createAsyncThunk(
	'events/fetchEvents',
	async (_, { fulfillWithValue, rejectWithValue }, api = new EventService()) => {
		try {
			return fulfillWithValue(api.getEvents());
		} catch (error) {
			return rejectWithValue(undefined);
		}
	}
)

const eventsSlice = createSlice({
	name: 'events',
	initialState: initialState,
	reducers: {
	},
	extraReducers: {
		[fetchEvents.fulfilled]: (state, action) => {
			console.log(action.payload)
			state.data = action.payload;
		}
	}
})

export const selectEvents = (state) => state.events.data;

export default eventsSlice.reducer;
