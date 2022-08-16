import ApiBase from "./ApiBase";
import {Holding, Security} from "./PortfolioService";

interface Entity {
    symbol: string;
    name: string;
    exchange: string;
    exchange_long: string;
    country: string;
    type: string;
    industry: string;
    match_score: number;
    sentiment_score: number;
    holding_info: Holding & Security;
}

export interface Article {
    uuid: string;
    title: string;
    description: string;
    keywords: string;
    snippet: string;
    url: string;
    image_url: string;
    language: string;
    published_at: string;
    source: string;
    relevance_score: null,
    entities: Entity[];
    similar: [];
}

interface ResponseMeta {
    found: number;
    returned: number;
    limit: number;
    page: number;
}

interface NewsResponseData {
    meta: ResponseMeta;
    data: Article[];
}

interface EntityResponseData {
    meta: ResponseMeta;
    data: Entity[];
}

class NewsService {
    static async getNews(page: number = 1): Promise<NewsResponseData> {
        const response = await ApiBase.axios.get('news/', { params: { page }});
        return response.data;
    }

    static async searchEntities(searchValue: string): Promise<EntityResponseData> {
        const response = await ApiBase.axios.get('entity-search/', { params: { search: searchValue }});
        return response.data;
    }
}

export default NewsService;
