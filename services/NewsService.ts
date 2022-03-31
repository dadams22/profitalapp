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
    private static _instance: NewsService;
    private _base: InstanceType<typeof ApiBase>;

    static getInstance(): InstanceType<typeof NewsService> {
        if (!NewsService._instance) {
            NewsService._instance = new NewsService();
        }
        return this._instance
    }

    constructor() {
        this._base = ApiBase.getInstance();
    }

    async getNews(page: number = 1): Promise<NewsResponseData> {
        const response = await this._base.axios.get('news/', { params: { page }});
        return response.data;
    }
}

export default NewsService;
