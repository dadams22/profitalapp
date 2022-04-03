import ApiBase from "./ApiBase";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
    static async obtainAuthToken(username: string, password: string) {
        const response = await ApiBase.axios.post('token-auth/', { username, password });
        const token = response.data.token;

        if (!token) {
            throw Error('Token was not returned in the response');
        }

        await AsyncStorage.setItem('TOKEN', token);
        ApiBase.setAuthToken(token);
    }

    static async getTokenFromStorage(): Promise<string> {
        const token = await AsyncStorage.getItem('TOKEN');
        if (!token) {
            throw Error('Error retrieving token from storage');
        }

        return token;
    }

    static async signOut() {
        await AsyncStorage.removeItem('TOKEN');
        ApiBase.removeAuthToken();
    }

    static async obtainPlaidLinkToken(): Promise<string> {
        const response = await ApiBase.axios.get('plaid-link-token/');
        return response.data.link_token;
    }
}

export default AuthService;
