import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import PortfolioService, {Account, Holding, Security} from "../services/PortfolioService";

export interface PortfolioState {
    loading: boolean;
    portfolio?: {
        balance: number;
        holdings: Holding[];
    }
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
            state.loading = false;
            state.portfolio = action.payload
        })
    }
})

export default portfolioSlice.reducer;