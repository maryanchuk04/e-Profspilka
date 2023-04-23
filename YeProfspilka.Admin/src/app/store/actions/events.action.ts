import { Event } from 'src/app/models/Event';

import { createAction, props } from '@ngrx/store';

export const fetchEvents = createAction(
	'[EVENTS] fetch events',
)

export const fetchEventsSuccess = createAction(
	'[EVENTS] fetch events success',
	props<{ events: Event[] }>()
)

export const fetchEventsFailed = createAction(
	'[EVENTS] create event success',
)

export const createEvent = createAction(
	'[EVENTS] create event',
	props<{ event: Event }>()
)

export const createEventSuccess = createAction(
	'[EVENTS] create event success',
	props<{ event: Event }>()
)

export const createEventFailed = createAction(
	'[EVENTS] create event success',
)

export const updateEvent = createAction(
	'[EVENTS] update event',
	props<{ event: Event }>()
)

export const updateEventSuccess = createAction(
	'[EVENTS] update event success',
	props<{ event: Event }>()
)

export const updateEventFailed = createAction(
	'[EVENTS] update event success',
)


export const deleteEvent = createAction(
	'[EVENTS] delete event',
	props<{ id: string }>()
)

export const deleteEventSuccess = createAction(
	'[EVENTS] delete event success',
	props<{ id: string }>()
)

export const deleteEventFailed = createAction(
	'[EVENTS] delete event success',
)