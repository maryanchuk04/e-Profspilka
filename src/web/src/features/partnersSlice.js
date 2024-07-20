import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PartnersService } from '../services/PartnersService';

const initialState = {
	data: [],
};

export const fetchPartners = createAsyncThunk(
	'partners/fetchPartners',
	async (_, { fulfillWithValue }, service = new PartnersService()) => {
		try {
			const { data } = await service.getPartners();

			return fulfillWithValue(data);
		} catch (error) {
			console.log(error);
		}
	}
);

const partnersSlice = createSlice({
	name: 'partners',
	initialState: initialState,
	extraReducers: {
		[fetchPartners.fulfilled]: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const selectPartners = (state) => state.partners.data;

export default partnersSlice.reducer;
