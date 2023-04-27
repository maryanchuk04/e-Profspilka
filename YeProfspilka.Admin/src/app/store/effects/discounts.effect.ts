import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { DiscountService } from 'src/app/services/discount.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
    createDiscount, createDiscountFailed, createDiscountSuccess, deleteDiscount,
    deleteDiscountFailed, deleteDiscountSuccess, fetchDiscounts, fetchDiscountsFailed,
    fetchDiscountsSuccess, updateDiscount, updateDiscountFailed, updateDiscountSuccess
} from '../actions/discounts.actions';

@Injectable()
export class DiscountsEffect {
	constructor(private service: DiscountService, private actions$: Actions) { }

	fetchDiscounts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchDiscounts),
			exhaustMap(() =>
				this.service
					.get()
					.pipe(
						map((discounts) =>
							fetchDiscountsSuccess({ discounts }),
							catchError(() => {
								fetchDiscountsFailed();
								return of([]);
							})
						),
					),
			),
		),
	);

	createDiscounts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createDiscount),
			mergeMap(({ discount }) =>
				this.service
					.create(discount)
					.pipe(
						map(() => createDiscountSuccess({ discount }),
							catchError(() => {
								createDiscountFailed();
								return of([]);
							})
						),
					),
			),
		)
	);

	updateDiscounts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateDiscount),
			exhaustMap(({ discount }) =>
				this.service
					.update(discount)
					.pipe(
						map((discount) => updateDiscountSuccess({ discount }),
							catchError(() => {
								updateDiscountFailed();
								return of([]);
							})
						),
					),
			),
		),
	);

	deleteDiscounts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteDiscount),
			exhaustMap(({ id }) =>
				this.service
					.delete(id)
					.pipe(
						map(() => deleteDiscountSuccess({ id }),
							catchError(() => {
								deleteDiscountFailed();
								return of([]);
							})
						)
					),
			),
		),
	);
}