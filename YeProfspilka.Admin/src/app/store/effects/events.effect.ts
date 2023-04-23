import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { showAlert } from '../actions/alert.action';
import {
    createEvent, createEventFailed, createEventSuccess, deleteEvent, deleteEventSuccess,
    fetchEvents, fetchEventsFailed, fetchEventsSuccess, updateEvent, updateEventFailed,
    updateEventSuccess
} from '../actions/events.action';
import { AppState } from '../AppState';
import { AlertType } from '../reducers/alert.reducer';

@Injectable()
export class EventsEffect {
	constructor(private actions$: Actions, private service: EventsService, private store: Store<AppState>) { }

	fetchEvents$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchEvents),
			exhaustMap(() =>
				this.service
					.get()
					.pipe(
						map((events: Event[]) => {
							return fetchEventsSuccess({ events });
						},
							catchError(() => {
								fetchEventsFailed();
								return of([]);
							})
						),
					),
			),
			tap(() => showAlert({ alert: { autoClose: true, type: AlertType.Success, message: "Ваші данні успішно збережено", open: true } as Alert }))
		)
	)

	createEvent$ = createEffect(() => this.actions$.pipe(
		ofType(createEvent),
		exhaustMap(({ event }) =>
			this.service
				.create(event)
				.pipe(
					map((event) => createEventSuccess({ event }),
						catchError(() => {
							createEventFailed();
							return of([]);
						}),
					),

				)
		)
	)
	)

	deleteEvent$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteEvent),
			mergeMap(({ id }) => this.service
				.delete(id)
				.pipe(
					map(() => deleteEventSuccess({ id }),
						catchError(() => {
							createEventFailed();
							return of([]);
						}),),
				)
			)
		)
	)

	updateEvent$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateEvent),
			exhaustMap(({ event }) =>
				this.service
					.update(event)
					.pipe(
						map((event) => updateEventSuccess({ event }),
							catchError(() => {
								updateEventFailed();
								return of([]);
							}),
						),
					)
			),
			tap(() => {
				this.store.dispatch(showAlert({ alert: { autoClose: true, type: AlertType.Success, message: "Ваші данні успішно збережено", open: true } as Alert }));
			})
		)
	)
}