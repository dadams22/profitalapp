import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface WebState {
    url?: string;
    title?: string;
    subtitle?: string;
}

const initialState: WebState = {};

export const webSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        openUrl: (state, action: PayloadAction<{url: string; title: string; subtitle: string}>) => {

            console.log(action.payload);
            return {...action.payload};
        },
        close: (state) => {
            state.url = undefined;
            state.title = undefined;
            state.subtitle = undefined;
        },
    },
})

export const { openUrl, close } = webSlice.actions;

export default webSlice.reducer;
