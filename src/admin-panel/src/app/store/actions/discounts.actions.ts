import { Discount } from 'src/app/models/Discount';

import { createAction, props } from '@ngrx/store';

export const fetchDiscounts = createAction(
	'[DISCOUNTS] fetch discounts'
)

export const fetchDiscountsSuccess = createAction(
	'[DISCOUNTS] fetch discounts success',
	props<{ discounts: Discount[] }>()
)

export const fetchDiscountsFailed = createAction(
	'[DISCOUNTS] fetch discounts failed'
)

export const createDiscount = createAction(
	'[DISCOUNTS] create discount',
	props<{ discount: Discount }>()
)

export const createDiscountSuccess = createAction(
	'[DISCOUNTS] create discount success',
	props<{ discount: Discount }>()
)

export const createDiscountFailed = createAction(
	'[DISCOUNTS] create discount failed'
)

export const updateDiscount = createAction(
	'[DISCOUNTS] update discount',
	props<{ discount: Discount }>()
)

export const updateDiscountSuccess = createAction(
	'[DISCOUNTS] update discount success',
	props<{ discount: Discount }>()
)

export const updateDiscountFailed = createAction(
	'[DISCOUNTS] update discount failed'
)

export const deleteDiscount = createAction(
	'[DISCOUNTS] delete discount',
	props<{ id: string }>()
)

export const deleteDiscountSuccess = createAction(
	'[DISCOUNTS] delete discount success',
	props<{ id: string }>()
)

export const deleteDiscountFailed = createAction(
	'[DISCOUNTS] delete discount failed',
)