import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventService } from "../services/EventService";

const initialState = {
	data: [],
	loading: false
}

export const fetchEvents = createAsyncThunk(
	'events/fetchEvents',
	async (_, { fulfillWithValue, rejectWithValue }, api = new EventService()) => {
		try {
			const { data } = await api.getEvents();
			return fulfillWithValue(data);
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
		[fetchEvents.pending]: (state) => {
			state.loading = true;
		},
		[fetchEvents.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		}
	}
})

export const selectEvents = (state) => state.events.data;

export default eventsSlice.reducer;
