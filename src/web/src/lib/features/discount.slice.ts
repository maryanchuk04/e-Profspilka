import { getAllDiscounts, getSharedDiscounts } from '@/apis/discount';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface DiscountState {
    data: any[];
    sharedDiscounts: any[];
    sharedDiscountsLoading: boolean;
    loading: boolean;
}

const initialState: DiscountState = {
    data: [],
    sharedDiscounts: [],
    sharedDiscountsLoading: false,
    loading: false,
};

export const fetchDiscounts = createAsyncThunk(
    'discount/fetchDiscounts',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await getAllDiscounts();
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchSharedDiscounts = createAsyncThunk(
    'discount/fetchSharedDiscounts',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await getSharedDiscounts();
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscounts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDiscounts.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchSharedDiscounts.pending, (state) => {
                state.sharedDiscountsLoading = true;
            })
            .addCase(fetchSharedDiscounts.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.sharedDiscounts = action.payload;
                state.sharedDiscountsLoading = false;
            });
    },
});

export const selectDiscounts = (state: { discounts: DiscountState }) => state.discounts.data;

export const selectDiscountsLoading = (state: { discounts: DiscountState }) => state.discounts.loading;

export const selectSharedDiscounts = (state: { discounts: DiscountState }) => state.discounts.sharedDiscounts;

export default discountSlice.reducer;