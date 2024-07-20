import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Question } from 'src/app/models/Question';
import {
	createQuestion,
	createQuestionSuccess,
	deleteQuestion,
	deleteQuestionSuccess,
	fetchQuestions,
	fetchQuestionsSuccess,
	searchQuestion,
	updateQuestion,
	updateQuestionSuccess,
} from '../actions/questions.action';

export interface QuestionState {
	questions: Question[];
	loading: boolean;
}

const initialState: QuestionState = {
	questions: [],
	loading: false,
};

export const questionReducer = createReducer(
	initialState,
	on(fetchQuestions, (state) => ({ ...state, loading: true })),
	on(fetchQuestionsSuccess, (state, { questions }) => ({
		...state,
		loading: false,
		questions: questions,
	})),
	on(createQuestion, (state) => ({ ...state, loading: true })),
	on(createQuestionSuccess, (state, { question }) => ({
		...state,
		questions: [...state.questions, question],
		loading: false,
	})),
	on(updateQuestion, (state) => ({ ...state, loading: true })),
	on(updateQuestionSuccess, (state, { question }) => {
		const questions = [...state.questions];
		const index = questions.findIndex((x) => x.id === question.id);
		if (index > -1) {
			questions.splice(index, 1, question);
		}
		return {
			...state,
			questions,
			loading: false,
		};
	}),
	on(deleteQuestionSuccess, (state, { id }) => {
		const updatedQuestions = state.questions.filter(
			(question) => question.id !== id,
		);

		return {
			...state,
			questions: updatedQuestions,
			loading: false,
		};
	}),
	// on(searchQuestion, (state, { search }) => ({
	// 	...state,
	// }))
);
