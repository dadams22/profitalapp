import axios from "axios";

const API_BASE_URL = 'https://1fdd-2601-645-8201-e70-b138-dbf4-e114-2524.ngrok.io/api';

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