import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
    createEventFailed, deleteEvent, deleteEventSuccess, fetchEvents, fetchEventsFailed,
    fetchEventsSuccess, updateEvent, updateEventFailed, updateEventSuccess
} from '../actions/events.action';
import { AppState } from '../AppState';

@Injectable()
export class EventsEffect {
	constructor(
		private actions$: Actions,
		private service: EventsService,
		private store: Store<AppState>,
		private toastService: ToastrService
	) {}

	fetchEvents$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchEvents),
			exhaustMap(() =>
				this.service.get().pipe(
					map(
						(events: Event[]) => {
							return fetchEventsSuccess({ events });
						},
						catchError(() => {
							fetchEventsFailed();
							return of([]);
						})
					)
				)
			)
			// tap(() => showAlert({ alert: { autoClose: true, type: AlertType.Success, message: "Ваші данні успішно збережено", open: true } as Alert }))
		)
	);

	// createEvent$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(createEvent),
	// 		exhaustMap(({ event }) =>
	// 			this.service.create(event).pipe(
	// 				map(
	// 					(event) => {
	// 						this.toastService.success('Подію успішно створено!');
	// 						return createEventSuccess({ event });
	// 					},
	// 					catchError(() => {
	// 						this.toastService.error('Помика при створенні події!');
	// 						createEventFailed();
	// 						return of([]);
	// 					})
	// 				)
	// 			)
	// 		)
	// 	)
	// );

	deleteEvent$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteEvent),
			mergeMap(({ id }) =>
				this.service.delete(id).pipe(
					map(
						() => {
							this.toastService.success('Подію видалено');
							return deleteEventSuccess({ id });
						},
						catchError(() => {
							this.toastService.error('Щось пішло не так під час видалення');
							createEventFailed();
							return of([]);
						})
					)
				)
			)
		)
	);

	updateEvent$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateEvent),
			exhaustMap(({ event }) =>
				this.service.update(event).pipe(
					map(
						(event) => {
							this.toastService.success('Подію успішно оновлено!');
							return updateEventSuccess({ event });
						},
						catchError(() => {
							this.toastService.success('Щось пішло не так при оновленні події!');
							updateEventFailed();
							return of([]);
						})
					)
				)
			)
			// tap(() => {
			//     this.store.dispatch(
			//         showAlert({
			//             alert: { autoClose: true, type: AlertType.Success, message: 'Ваші данні успішно збережено', open: true } as Alert,
			//         })
			//     );
			// })
		)
	);
}
