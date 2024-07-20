import { createSelector } from "@ngrx/store";
import { AppState } from "../AppState";

const selectAdvantagesState = (state: AppState) => state.advantages;

export const selectAdvantages = createSelector(
	selectAdvantagesState,
	(state) => state.advantages,
);

export const selectAdvantagesLoading = createSelector(
	selectAdvantagesState,
	(state) => state.loading
)
