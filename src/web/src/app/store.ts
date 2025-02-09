import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom application dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;
