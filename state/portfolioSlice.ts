import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import PortfolioService from "../services/PortfolioService";

export interface PortfolioState {
    holdings: any;
}

const initialState: PortfolioState = { holdings: {} };

export const getHoldings = createAsyncThunk('portfolio/getHoldings', async () => {
    return await PortfolioService.getHoldings();
})

export const portfolioSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHoldings.fulfilled, (state, action) => {
            state.holdings = action.payload;
        })
    }
})

export default portfolioSlice.reducer;