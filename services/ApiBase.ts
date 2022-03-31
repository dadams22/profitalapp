import axios, {AxiosInstance} from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;
const API_BASE_URL = 'http://a593-2610-148-1f02-3000-455-b9b8-7e4c-2093.ngrok.io/api/';
// const API_BASE_URL = 'https://google.com';
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