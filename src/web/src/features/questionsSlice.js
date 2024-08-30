import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { QuestionsService } from '../services/QuestionsService';

const initialState = {
    data: [],
};

export const fetchQuestions = createAsyncThunk(
    'questions/fetch',
    async (_, { fulfillWithValue, rejectWithValue }, service = new QuestionsService()) => {
        try {
            const { data } = await service.get();

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState: initialState,
    extraReducers: {
        [fetchQuestions.fulfilled]: (state, { payload }) => {
            state.data = payload;
        },
    },
});

export const selectQuestions = (state) => state.questions.data;

export default questionsSlice.reducer;
