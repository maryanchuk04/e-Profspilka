import { ApiService } from './config/ApiService';
import axiosInstance from './config/axios.config';
import { Token } from './TokenService';
const api = new ApiService();

export class UserService {
	#url = '/user';

	constructor() {}

	async get(token = null) {
		return await api.get('api/user', token);
	}
}

export const getUser = async (token = null) => {
	return axiosInstance.get('api/user', {
		headers: {
			Authorization: `Bearer ${token ?? Token.get()}`,
		},
		withCredentials: true,
	});
};
