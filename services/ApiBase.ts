import axios, {AxiosInstance} from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;
const API_BASE_URL = 'http://2b46-2610-148-1f02-3000-ac87-2262-f2aa-11f.ngrok.io/api';

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