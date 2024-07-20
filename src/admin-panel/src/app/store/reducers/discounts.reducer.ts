import { Discount } from 'src/app/models/Discount';

import { createReducer, on } from '@ngrx/store';

import * as DiscountsActions from '../actions/discounts.actions';

export interface DiscountsState {
	data: Discount[],
	loading: boolean;
}

const initialState: DiscountsState = {
	data: [],
	loading: false
}


export const discountsReducer = createReducer(
	initialState,
	on(DiscountsActions.fetchDiscounts, (state) => ({ ...state, loading: true })),
	on(DiscountsActions.fetchDiscountsSuccess, (state, { discounts }) => ({ ...state, data: discounts, loading: false })),
	on(DiscountsActions.fetchDiscountsFailed, (state) => ({ ...state, loading: false })),
	on(DiscountsActions.createDiscount, (state) => ({ ...state, loading: true })),
	on(DiscountsActions.createDiscountSuccess, (state, { discount }) => ({ ...state, data: [...state.data, discount], loading: false })),
	on(DiscountsActions.createDiscountFailed, (state) => ({ ...state, loading: false })),
	on(DiscountsActions.updateDiscount, (state) => ({ ...state, loading: true })),
	on(DiscountsActions.updateDiscountSuccess, (state, { discount }) => {
		const discounts = [...state.data];
		const index = discounts.findIndex((x) => x.id === discount.id);
		if (index > -1) {
			discounts.splice(index, 1, discount);
		}

		return {
			...state,
			loading: false,
			data: discounts
		}
	}),
	on(DiscountsActions.updateDiscountFailed, (state) => ({ ...state, loading: false })),
	on(DiscountsActions.deleteDiscount, (state) => ({ ...state, loading: true })),
	on(DiscountsActions.deleteDiscountSuccess, (state, { id }) => ({ ...state, loading: false, data: state.data.filter(f => f.id !== id) })),
	on(DiscountsActions.deleteDiscountFailed, (state) => ({ ...state, loading: false }))
)