import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { DiscountService } from "../services/DiscountService"

const initialState = {
	data: []
}

export const fetchDiscounts = createAsyncThunk(
	'discount/fetchDiscounts',
	async (_, { fulfillWithValue, rejectWithValue }, service = new DiscountService()) => {
		try {
			return fulfillWithValue(service.getAll());
		}
		catch (error) {
			return rejectWithValue(null);
		}
	}
)

export const discountSlice = createSlice({
	name: "discount",
	initialState: initialState,
	reducers: {
	},
	extraReducers: {
		[fetchDiscounts.fulfilled]: (state, action) => {
			state.data = action.payload;
		}
	}
});

export const selectDiscounts = (state) => state.discounts.data;

export default discountSlice.reducer;