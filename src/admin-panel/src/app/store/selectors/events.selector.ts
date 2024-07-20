import { createSelector } from '@ngrx/store';

import { AppState } from '../AppState';

const selectEvents = (state: AppState) => state.events;

export const selectEventsData = createSelector(
	selectEvents,
	(state) => state.data,
);

export const selectEventsLoading = createSelector(
	selectEvents,
	state => state.loading 
)