import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface WebState {
    url?: string;
}

const initialState: WebState = {};

export const webSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        openUrl: ((state, action: PayloadAction<string>) => {
            const url = action.payload;
            state.url = url;
        }),
        close: (state) => state.url = undefined,
    },
})

export const { openUrl, close } = webSlice.actions;

export default webSlice.reducer;
