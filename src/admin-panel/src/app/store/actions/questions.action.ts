import { createAction, props } from '@ngrx/store';
import { Question } from 'src/app/models/Question';

export const fetchQuestions = createAction(
	'[QUESTIONS] Fetch questions pending',
);

export const fetchQuestionsSuccess = createAction(
	'[QUESTIONS] Fetch questions success',
	props<{ questions: Question[] }>(),
);

export const createQuestion = createAction(
	'[QUESTION] Create question pending',
	props<{ question: Question }>(),
);

export const createQuestionSuccess = createAction(
	'[QUESTION] Create question success',
	props<{ question: Question }>(),
);

export const updateQuestion = createAction(
	'[QUESTION] Update question',
	props<{ question: Question }>(),
);

export const updateQuestionSuccess = createAction(
	'[QUESTION] Update question success',
	props<{ question: Question }>(),
);

export const searchQuestion = createAction(
	'[QUESTION] Search question',
	props<{ keyWord: string }>,
);

export const deleteQuestion = createAction(
	'[QUESTION] Delete question',
	props<{ id: string }>(),
);

export const deleteQuestionSuccess = createAction(
	'[QUESTION] Delete question success',
	props<{ id: string }>(),
);
