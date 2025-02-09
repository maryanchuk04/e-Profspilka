import { getEvents } from '@/apis/events';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventsState {
    data: any[];
    loading: boolean;
}

const initialState: EventsState = {
    data: [],
    loading: false,
};

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await getEvents();
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(undefined);
        }
    }
);

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.data = action.payload;
                state.loading = false;
            });
    },
});

export const selectEvents = (state: { events: EventsState }) => state.events.data;

export default eventsSlice.reducer;