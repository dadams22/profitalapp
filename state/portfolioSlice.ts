import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import PortfolioService, {Account, Holding, Security} from "../services/PortfolioService";

export interface PortfolioState {
    loading: boolean;
    accounts?: Account[];
    holdings?: Holding[];
    securities?: Security[];
}

const initialState: PortfolioState = { loading: true };

export const getHoldings = createAsyncThunk('portfolio/getHoldings', async () => {
    return await PortfolioService.getHoldings();
})

export const portfolioSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHoldings.fulfilled, (state, action) => {
            const { accounts, holdings, securities } = action.payload;
            state.accounts = accounts;
            state.holdings = holdings;
            state.securities = securities;
        })
    }
})

export default portfolioSlice.reducer;