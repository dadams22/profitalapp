import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import PortfolioService, {Holding} from "../services/PortfolioService";

export interface PortfolioState {
    loading: boolean;
    portfolio?: {
        balance: number;
        holdings: Holding[];
        currencies: Holding[];
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
            console.log(action.payload);
            state.loading = false;
            state.portfolio = action.payload
        })
    }
})

export default portfolioSlice.reducer;