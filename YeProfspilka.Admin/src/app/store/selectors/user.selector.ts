import { createSelector } from '@ngrx/store';
import { AppState } from '../AppState';

const selectUser = (state: AppState) => state.user;

export const selectUserData = createSelector(selectUser, (state) => state.data);
