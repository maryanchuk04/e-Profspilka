import { createSelector } from '@ngrx/store';

import { AppState } from '../AppState';

const selectState = (state: AppState) => state.discounts;

export const selectDiscountsData = createSelector(
	selectState,
	(state) => state.data
)

export const selectDiscountsLoading = createSelector(
	selectState,
	(state) => state.loading
)