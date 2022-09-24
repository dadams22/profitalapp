import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface WebState {
    url?: string;
    title?: string;
    subtitle?: string;
    show: boolean;
}

const initialState: WebState = {
    show: false,
};

export const webSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        openUrl: (state, action: PayloadAction<{url: string; title: string; subtitle: string}>) => {
            return {
                ...action.payload,
                show: true,
            };
        },
        close: (state) => {
            state.show = false;
        },
    },
})

export const { openUrl, close } = webSlice.actions;

export default webSlice.reducer;
