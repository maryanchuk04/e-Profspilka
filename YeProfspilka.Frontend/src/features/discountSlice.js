import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DiscountService } from '../services/DiscountService';

const initialState = {
	data: [],
	sharedDiscounts: [],
	sharedDiscountsLoading: false,
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

export const fetchSharedDiscounts = createAsyncThunk(
	'discount/fetchSharedDiscounts',
	async (_, { fulfillWithValue, rejectWithValue }, service = new DiscountService()) => {
		try {
			const { data } = await service.getSharedDiscounts();
			console.log(data);
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
		[fetchSharedDiscounts.pending]: (state) => {
			state.sharedDiscountsLoading = true;
		},
		[fetchSharedDiscounts.fulfilled]: (state, action) => {
			state.sharedDiscounts = action.payload;
			state.sharedDiscountsLoading = false;
		},
	},
});

export const selectDiscounts = (state) => state.discounts.data;

export const selectDiscountsLoading = (state) => state.discounts.loading;

export const selectSharedDiscounts = (state) => state.discounts.sharedDiscounts;

export default discountSlice.reducer;
