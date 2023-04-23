import { createReducer, on } from "@ngrx/store";
import { Advantage } from "src/app/models/Advantage";
import { createAdvantage, createAdvantageSuccess, deleteAdvantage, deleteAdvantageSuccess, fetchAdvantage, fetchAdvantageSuccess, updateAdvantage, updateAdvantageSuccess } from "../actions/advantage.action";

export interface AdvantagesState {
	advantages: Advantage[];
	loading: boolean;
}

const initialState: AdvantagesState = {
	advantages: [],
	loading: false
}

export const advantageReducer = createReducer(
	initialState,
	on(fetchAdvantage, (state) => ({ ...state, loading: true })),
	on(fetchAdvantageSuccess, (state, { advantages }) => ({ ...state, loading: false, advantages: advantages })),
	on(createAdvantage, (state) => ({ ...state, loading: true })),
	on(createAdvantageSuccess, (state, { advantage }) => ({
		...state,
		advantages: [...state.advantages, advantage],
		loading: false
	})),
	on(updateAdvantage, (state) => ({ ...state, loading: true })),
	on(updateAdvantageSuccess, (state, { advantage }) => {
		const advantages = [...state.advantages];
		const index = advantages.findIndex((x) => x.id === advantage.id);

		if (index > -1) {
			advantages.splice(index, 1, advantage);
		}

		return {
			...state,
			advantages,
			loading: false,
		};
	}),
	on(deleteAdvantage, (state) => ({ ...state, loading: true })),
	on(deleteAdvantageSuccess, (state, { id }) => ({ ...state, loading: false, advantages: [...state.advantages.filter(f => f.id !== id)] }))
)