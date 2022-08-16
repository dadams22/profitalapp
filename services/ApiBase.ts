import axios, {AxiosInstance} from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;
const API_BASE_URL = 'http://efbb-2601-645-8201-e840-a405-9c1b-34cd-633f.ngrok.io/api';

class ApiBase {
    static axios = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' },});

    static setAuthToken(token: string) {
        ApiBase.axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    static removeAuthToken() {
        // @ts-ignore
        ApiBase.axios.defaults.headers.common['Authorization'] = undefined;
    }
}

export default ApiBase;