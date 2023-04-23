import { createAction, props } from "@ngrx/store"
import { Advantage } from "src/app/models/Advantage"

export const fetchAdvantage = createAction(
	'[ADVANTAGE] fetch advantages'
)

export const fetchAdvantageSuccess = createAction(
	'[ADVANTAGE] fetch advantages success',
	props<{ advantages: Advantage[] }>()
)

export const createAdvantage = createAction(
	'[ADVANTAGE] create advantage',
	props<{ advantage: Advantage }>()
)

export const createAdvantageSuccess = createAction(
	'[ADVANTAGE] create advantage success',
	props<{ advantage: Advantage }>()
)

export const updateAdvantage = createAction(
	'[ADVANTAGE] update advantage',
	props<{ advantage: Advantage }>()
)

export const updateAdvantageSuccess = createAction(
	'[ADVANTAGE] update advantage success',
	props<{ advantage: Advantage }>()
)

export const deleteAdvantage = createAction(
	'[PARTNERS] delete advantage',
	props<{ id: string }>()
)

export const deleteAdvantageSuccess = createAction(
	'[PARTNERS] delete advantage success',
	props<{ id: string }>()
)