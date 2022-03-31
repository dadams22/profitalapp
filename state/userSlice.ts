import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const authService = AuthService.getInstance();

export const getTokenFromStorage = createAsyncThunk(
    'user/getTokenFromStorage',
    async () => {
        const token = await authService.getTokenFromStorage();
        ApiBase.getInstance().setAuthToken(token);
    }
);

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }: { username: string, password: string }) => {
        await authService.obtainAuthToken(username, password);
    }
);

export const signOut = createAsyncThunk('user/signOut',
    async () => {
        await AuthService.getInstance().signOut();
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loadingRequest = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.authenticated = true
            state.loadingRequest = false
        })
        builder.addCase(login.rejected, (state) => {
            state.loadingRequest = false;
        })
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

export default userSlice.reducer;