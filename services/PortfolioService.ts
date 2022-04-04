import ApiBase from "./ApiBase";


class PortfolioService {
    static async getHoldings(): any {
        const response = await ApiBase.axios.get('holdings/');
        return response.data
    }
}

export default PortfolioService;