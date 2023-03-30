import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdvantagesService } from "../services/AdvantagesService";

const initialState = {
	data: [],
}

export const fetchAdvantages = createAsyncThunk(
	'advantages/fetchAdvantages',
	async (_, { fulfillWithValue, rejectWithValue }, api = new AdvantagesService()) => {
		try {
			return fulfillWithValue(api.getAdvantages());
		} catch (error) {
			return rejectWithValue(undefined);
		}
	}
)

const advantagesSlice = createSlice({
	name: 'advantages',
	initialState: initialState,
	reducers: {
	},
	extraReducers: {
		[fetchAdvantages.fulfilled]: (state, action) => {
			state.data = action.payload;
		}
	}
})

export const selectAdvantages = (state) => state.advantages.data;

export default advantagesSlice.reducer;
