import { getAdvantages } from '@/apis/advanvages';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdvantagesState {
    data: any[];
}

const initialState: AdvantagesState = {
    data: [],
};

export const fetchAdvantages = createAsyncThunk(
    'advantages/fetchAdvantages',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await getAdvantages();
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(undefined);
        }
    }
);

const advantagesSlice = createSlice({
    name: 'advantages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdvantages.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
        });
    },
});

export const selectAdvantages = (state: { advantages: AdvantagesState }) => state.advantages.data;

export default advantagesSlice.reducer;