import { createAction, props } from "@ngrx/store";
import { Partner } from "src/app/models/Partners";

export const fetchPartners = createAction(
	'[PARTNERS] fetch partners'
)

export const fetchPartnersSuccess = createAction(
	'[PARTNERS] fetch partners success',
	props<{ partners: Partner[] }>()
)

export const createPartner = createAction(
	'[PARTNERS] create partner',
	props<{ partner: Partner }>()
)

export const createPartnerSuccess = createAction(
	'[PARTNERS] create partner success',
	props<{ partner: Partner }>()
)

export const updatePartner = createAction(
	'[PARTNERS] update partner',
	props<{ partner: Partner }>()
)

export const updatePartnerSuccess = createAction(
	'[PARTNERS] update partner',
	props<{ partner: Partner }>()
)

export const deletePartner = createAction(
	'[PARTNERS] delete partner',
	props<{ id: string }>()
)

export const deletePartnerSuccess = createAction(
	'[PARTNERS] delete partner success',
	props<{ id: string }>()
)