import { createReducer, on } from "@ngrx/store";
import { Partner } from "src/app/models/Partners";
import { createPartner, createPartnerSuccess, deletePartner, deletePartnerSuccess, fetchPartners, fetchPartnersSuccess, updatePartner, updatePartnerSuccess } from "../actions/partners.action";

export interface PartnersState {
	partners: Partner[];
	loading: boolean;
}

const initialState: PartnersState = {
	partners: [],
	loading: false
}

export const partnersReducer = createReducer(
	initialState,
	on(fetchPartners, (state) => ({ ...state, loading: true })),
	on(fetchPartnersSuccess, (state, { partners }) => ({ ...state, partners, loading: false })),
	on(createPartner, (state) => ({ ...state, loading: true })),
	on(createPartnerSuccess, (state, { partner }) => ({ ...state, partners: [...state.partners, partner], loading: false })),
	on(updatePartner, (state, { partner }) => ({ ...state, loading: true })),
	on(updatePartnerSuccess, (state, { partner }) => {
		const partners = [...state.partners];
		const index = partners.findIndex((x) => x.id === partner.id);

		if (index > -1) {
			partners.splice(index, 1, partner);
		}

		return {
			...state,
			partners,
			loading: false,
		};
	}),
	on(deletePartner, (state) => ({ ...state, loading: true })),
	on(deletePartnerSuccess, (state, { id }) => ({ ...state, loading: false, partners: [...state.partners.filter(f => f.id !== id)] }))
)