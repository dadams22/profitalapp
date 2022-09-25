import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthService, {User} from "../services/AuthService";
import ApiBase from "../services/ApiBase";

export interface UserState {
    authenticated: boolean;
    checkingStatus: boolean;
    loadingRequest: boolean;
    user?: User;
    plaid_link_token?: string;
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

export const getUser = createAsyncThunk('user/get',
    async () => await AuthService.getUser()
);

export const createUser = createAsyncThunk('user/create',
    async (formData: { email: string; username: string; password: string;}) =>  
        await AuthService.createUser(formData)
)

export const obtainPlaidLinkToken = createAsyncThunk('user/getPlaidLinkToken',
    async () => await AuthService.obtainPlaidLinkToken()
)

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
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            const { user, plaid_link_token } = action.payload;
            state.user = user;
            state.plaid_link_token = plaid_link_token;
        })
        builder.addCase(obtainPlaidLinkToken.fulfilled, (state, action) => {
            state.plaid_link_token = action.payload;
        })
    }
})

export const { setAuthenticated } = userSlice.actions;

export default userSlice.reducer;