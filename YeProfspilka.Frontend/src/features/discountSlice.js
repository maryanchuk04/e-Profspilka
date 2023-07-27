import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DiscountService } from '../services/DiscountService';

const initialState = {
	data: [],
	loading: false,
};

export const fetchDiscounts = createAsyncThunk(
	'discount/fetchDiscounts',
	async (_, { fulfillWithValue, rejectWithValue }, service = new DiscountService()) => {
		try {
			const { data } = await service.getAll();
			return fulfillWithValue(data);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const discountSlice = createSlice({
	name: 'discount',
	initialState: initialState,
	reducers: {},
	extraReducers: {
		[fetchDiscounts.pending]: (state) => {
			state.loading = true;
		},
		[fetchDiscounts.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
	},
});

export const selectDiscounts = (state) => state.discounts.data;

export const selectDiscountsLoading = (state) => state.discounts.loading;

export default discountSlice.reducer;
