import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import webReducer from './webSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        web: webReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;