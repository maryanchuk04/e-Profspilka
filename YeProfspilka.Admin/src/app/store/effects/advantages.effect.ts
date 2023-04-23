import { exhaustMap, map, mergeMap } from 'rxjs';
import { Advantage } from 'src/app/models/Advantage';
import { AdvantageService } from 'src/app/services/advantage.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
    createAdvantage, createAdvantageSuccess, deleteAdvantage, deleteAdvantageSuccess,
    fetchAdvantage, fetchAdvantageSuccess, updateAdvantage, updateAdvantageSuccess
} from '../actions/advantage.action';

@Injectable()
export class AdvantagesEffect {
	constructor(private actions$: Actions, private service: AdvantageService) { }

	fetchAdvantages$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchAdvantage),
			exhaustMap(() =>
				this.service
					.get()
					.pipe(
						map((advantages) => fetchAdvantageSuccess({ advantages }),
						),
					),
			),
		)
	)

	createAdvantage$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createAdvantage),
			mergeMap(({ advantage }) =>
				this.service.create(advantage).pipe(
					map((advantage: Advantage) => createAdvantageSuccess({ advantage }))
				)
			)
		)
	)

	updateAdvantage$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateAdvantage),
			mergeMap(({ advantage }) =>
				this.service.update(advantage).pipe(
					map((advantage: Advantage) => updateAdvantageSuccess({ advantage }))
				)
			)
		)
	)

	deleteAdvantage$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteAdvantage),
			exhaustMap(({ id }) => this.service.delete(id).pipe(
				map(() => deleteAdvantageSuccess({ id }))
			))
		)
	)

	
}