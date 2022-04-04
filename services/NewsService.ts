import ApiBase from "./ApiBase";

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

interface NewsResponseData {
    meta: {
        found: number;
        returned: number;
        limit: number;
        page: number;
    }
    data: Article[];
}

class NewsService {
    static async getNews(page: number = 1): Promise<NewsResponseData> {
        const response = await ApiBase.axios.get('news/', { params: { page }});
        return response.data;
    }
}

export default NewsService;
