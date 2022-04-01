import axios, {AxiosInstance} from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;
const API_BASE_URL = 'http://2b46-2610-148-1f02-3000-ac87-2262-f2aa-11f.ngrok.io/api';
console.log(API_BASE_URL);

class ApiBase {
    private static _instance: ApiBase;
    axios: AxiosInstance;

    static getInstance(): InstanceType<typeof ApiBase> {
        if (!ApiBase._instance) {
            ApiBase._instance = new ApiBase();
        }

        return ApiBase._instance;
    }

    constructor() {
        this.axios = axios.create({ baseURL: API_BASE_URL, })
    }

    setAuthToken(token: string) {
        this.axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    removeAuthToken() {
        // @ts-ignore
        this.axios.defaults.headers.common['Authorization'] = undefined;
    }
}

export default ApiBase;