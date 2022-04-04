import ApiBase from "./ApiBase";

export interface Account {
    account_id: string;
    balances: {
        available: number | null;
        current: number | null;
        iso_currency_code: string | null;
        limit: number | null;
        unofficial_currency_code: string | null;
    }
    mask: string | null;
    name: string;
    official_name: string | null;
    subtype: string | null;
    type: string;
}


export interface Holding {
    account_id: string;
    cost_basis: number | null;
    institution_price: number;
    institution_price_as_of: string | null;
    institution_value: number;
    iso_currency_code: string | null;
    quantity: number;
    security_id: string;
    unofficial_currency_code: null
}


export interface Security {
    close_price: number | null;
    close_price_as_of: string | null;
    cusip: string | null;
    institution_id: string | null;
    institution_security_id: string | null;
    is_cash_equivalent: boolean | null;
    isin: string | null;
    iso_currency_code: string | null;
    name: string | null;
    proxy_security_id: string | null;
    security_id: string;
    sedol: string | null;
    ticker_symbol: string | null;
    type: string | null;
    unofficial_currency_code: string | null;
}


interface GetHoldingsResponse {
    accounts: Account[];
    holdings: Holding[];
    securities: Security[];
}


class PortfolioService {
    static async getHoldings(): Promise<GetHoldingsResponse> {
        const response = await ApiBase.axios.get('holdings/');
        return response.data;
    }
}

export default PortfolioService;