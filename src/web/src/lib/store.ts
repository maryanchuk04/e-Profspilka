import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../lib/features';

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom application dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;
