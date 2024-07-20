import { createSelector } from "@ngrx/store";
import { AppState } from "../AppState";

const selectPartners = (state: AppState) => state.partners;

export const selectPartnersData = createSelector(
	selectPartners,
	(state) => state.partners,
);

export const selectPartnersLoading = createSelector(
	selectPartners,
	(state) => state.loading,
);
