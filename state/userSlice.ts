import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import ApiBase from "../services/ApiBase";

export interface UserState {
    authenticated: boolean;
    checkingStatus: boolean;
    loadingRequest: boolean;
}

const initialState: UserState = {
    authenticated: false,
    checkingStatus: true,
    loadingRequest: false,
}

export const getTokenFromStorage = createAsyncThunk(
    'user/getTokenFromStorage',
    async () => {
        const token = await AuthService.getTokenFromStorage();
        ApiBase.setAuthToken(token);
    }
);

export const signOut = createAsyncThunk('user/signOut',
    async () => {
        await AuthService.signOut();
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.authenticated = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTokenFromStorage.fulfilled, (state) => {
            state.authenticated = true;
            state.checkingStatus = false;
        })
        builder.addCase(getTokenFromStorage.rejected, (state) => {
            state.authenticated = false;
            state.checkingStatus = false;
        })
        builder.addCase(signOut.fulfilled, (state) => {
            state.authenticated = false;
        })
    }
})

export const { setAuthenticated } = userSlice.actions;

export default userSlice.reducer;