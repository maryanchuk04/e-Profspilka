import { createSelector } from '@ngrx/store';
import { AppState } from '../AppState';

const selectQuestion = (state: AppState) => state.question;

export const selectQuestions = createSelector(
	selectQuestion,
	(state) => state.questions,
);

export const selectQuestionsLoading = createSelector(
	selectQuestion,
	(state) => state.loading,
);
