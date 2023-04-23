import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, mergeMap } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import {
	createQuestion,
	createQuestionSuccess,
	deleteQuestion,
	deleteQuestionSuccess,
	fetchQuestions,
	fetchQuestionsSuccess,
	updateQuestion,
	updateQuestionSuccess,
} from '../actions/questions.action';

@Injectable()
export class QuestionEffect {
	constructor(
		private actions$: Actions,
		private questionService: QuestionService,
	) { }

	fetchQuestions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchQuestions),
			exhaustMap(() =>
				this.questionService
					.getAll()
					.pipe(
						map((questions) =>
							fetchQuestionsSuccess({ questions }),
						),
					),
			),
		),
	);

	createQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createQuestion),
			mergeMap(({ question }) =>
				this.questionService
					.create({
						answer: question.answer,
						questionText: question.questionText,
					})
					.pipe(map(() => createQuestionSuccess({ question }))),
			),
		),
	);

	updateQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateQuestion),
			exhaustMap(({ question }) =>
				this.questionService
					.update(question)
					.pipe(
						map((question) => updateQuestionSuccess({ question })),
					),
			),
		),
	);

	deleteQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteQuestion),
			exhaustMap(({ id }) =>
				this.questionService
					.delete(id)
					.pipe(map(() => deleteQuestionSuccess({ id }))),
			),
		),
	);
}
