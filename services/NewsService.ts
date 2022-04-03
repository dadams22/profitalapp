import ApiBase from "./ApiBase";

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
    entities: [];
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
