import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface WebState {
    url?: string;
}

const initialState: WebState = {};

export const webSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        openUrl: ((state, action: PayloadAction<string>) => {
            state.url = action.payload;
        }),
        close: (state) => state.url = undefined,
    },
})

export const { openUrl, close } = webSlice.actions;

export default webSlice.reducer;
