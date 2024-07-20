import { Event } from 'src/app/models/Event';

import { createReducer, on } from '@ngrx/store';

import * as EventsAction from '../actions/events.action';

export interface EventsState {
	data: Event[];
	loading: boolean;
	errors: string[]
}

const initialState: EventsState = {
	data: [],
	loading: false,
	errors: []
}

export const eventsReducer = createReducer(
	initialState,
	on(EventsAction.fetchEvents, (state) => ({ ...state, loading: true })),
	on(EventsAction.fetchEventsSuccess, (state, { events }) => ({ ...state, data: events, loading: false })),
	on(EventsAction.fetchEventsFailed, (state) => ({ ...state, loading: false })),
	on(EventsAction.createEvent, (state) => ({ ...state, loading: true })),
	on(EventsAction.createEventSuccess, (state) => ({ ...state, data: [...state.data], loading: false })),
	on(EventsAction.createEventFailed, (state) => ({ ...state, loading: false })),
	on(EventsAction.deleteEvent, (state) => ({ ...state, loading: true })),
	on(EventsAction.deleteEventSuccess, (state, { id }) =>
		({ ...state, loading: false, data: state.data.filter(f => f.id !== id) })),
	on(EventsAction.deleteEventFailed, (state) => ({ ...state, loading: false })),
	on(EventsAction.updateEvent, (state) => ({ ...state, loading: true })),
	on(EventsAction.updateEventSuccess, (state, { event }) => {
		const events = [...state.data];
		const index = events.findIndex((x) => x.id === event.id);
		if (index > -1) {
			events.splice(index, 1, event);
		}

		return {
			...state,
			loading: false,
			data: events
		}
	}),
	on(EventsAction.deleteEventFailed, (state) => ({ ...state, loading: false }))
)