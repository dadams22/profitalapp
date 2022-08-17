import axios from "axios";

const API_BASE_URL = 'http://88c3-2601-645-8201-e840-9928-74cb-f700-354f.ngrok.io/api';

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