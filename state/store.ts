import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import webReducer from './webSlice';
import portfolioReducer from './portfolioSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        web: webReducer,
        portfolio: portfolioReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;