import axios, {AxiosInstance} from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;
const API_BASE_URL = 'http://a171-2600-1005-b062-5207-b4bc-6ca1-10b2-e9c5.ngrok.io/api';

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