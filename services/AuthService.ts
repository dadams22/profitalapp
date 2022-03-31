import ApiBase from "./ApiBase";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
    private static _instance: AuthService;
    private _base: InstanceType<typeof ApiBase>;

    static getInstance(): InstanceType<typeof AuthService> {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }
        return this._instance
    }

    constructor() {
        this._base = ApiBase.getInstance();
    }

    async obtainAuthToken(username: string, password: string) {
        const response = await this._base.axios.post('token-auth/', { username, password });
        console.log(response);
        const token = response.data.token;

        if (!token) {
            throw Error('Token was not returned in the response');
        }

        await AsyncStorage.setItem('TOKEN', token)
            .catch(() => console.log('Error occurred storing token'));
        this._base.setAuthToken(token);
    }

    async getTokenFromStorage(): Promise<string> {
        const token = await AsyncStorage.getItem('TOKEN');
        if (!token) {
            throw Error('Error retrieving token from storage');
        }

        return token;
    }

    async signOut() {
        await AsyncStorage.removeItem('TOKEN');
        this._base.removeAuthToken();
    }

    async obtainPlaidLinkToken(): Promise<string> {
        const response = await this._base.axios.get('plaid-link-token/');
        return response.data.link_token;
    }
}

export default AuthService;
