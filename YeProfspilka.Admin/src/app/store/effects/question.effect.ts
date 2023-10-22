import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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
		private toastrService: ToastrService
	) {}

	fetchQuestions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchQuestions),
			exhaustMap(() =>
				this.questionService
					.getAll()
					.pipe(map((questions) => fetchQuestionsSuccess({ questions })))
			)
		)
	);

	createQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createQuestion),
			switchMap(({ question }) =>
				this.questionService
					.create({
						answer: question.answer,
						questionText: question.questionText,
					})
					.pipe(
						map((question) => {
							this.toastrService.success('Питання успішно створено!');
							return createQuestionSuccess({ question });
						}),
						catchError(() => {
							this.toastrService.success('Питання успішно створено!');
							return of(undefined);
						})
					)
			)
		)
	);

	updateQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateQuestion),
			exhaustMap(({ question }) =>
				this.questionService
					.update(question)
					.pipe(map((question) => updateQuestionSuccess({ question })))
			)
		)
	);

	deleteQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteQuestion),
			exhaustMap(({ id }) =>
				this.questionService.delete(id).pipe(
					map(() => {
						this.toastrService.success('Успішно видалено');
						return deleteQuestionSuccess({ id });
					}),
					catchError((err) => {
						this.toastrService.success('Щось пішло не так!');
						return EMPTY;
					})
				)
			)
		)
	);
}
