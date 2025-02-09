import axios from "axios";
import api from "./config/axios.config";
import { setAccessToken } from "./token";

const endpoint = "/authenticate";

export const googleDataProvider = async (googleAccessToken: string) => {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`);
        return data;
    } catch (err) {
        throw Error(err);
    }
};

export const authenticateGoogle = async ({ name, picture, email, hd }): Promise<any> => {
    try {
        const response = await api.post(`${endpoint}/google`, {
            fullName: name,
            avatar: picture,
            email,
            hd,
        });

        if (response.data.token) {
            setAccessToken(response.data.token);
            return { data: response.data, status: response.status };
        }
    } catch (err) {
        throw Error(err);
    }
}

export const logout = (): Promise<any> => api.post(`${endpoint}/logout`);

