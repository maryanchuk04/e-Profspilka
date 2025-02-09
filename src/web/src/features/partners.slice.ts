import { getPartners } from '@/apis/partners';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PartnersState {
    data: any[];
}

const initialState: PartnersState = {
    data: [],
};

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await getPartners();
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error);
        }
    }
);

const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPartners.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
        });
    },
});

export const selectPartners = (state: { partners: PartnersState }) => state.partners.data;

export default partnersSlice.reducer;