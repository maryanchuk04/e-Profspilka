import { getQuestions } from '@/apis/questions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionsState {
    data: any[];
}

const initialState: QuestionsState = {
    data: [],
};

export const fetchQuestions = createAsyncThunk(
    'questions/fetch',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await getQuestions();
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
        });
    },
});

export const selectQuestions = (state: { questions: QuestionsState }) => state.questions.data;

export default questionsSlice.reducer;