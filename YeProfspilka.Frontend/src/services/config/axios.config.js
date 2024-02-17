import axios from 'axios';
import { Token } from '../TokenService';

export const USER_NOT_FOUND = 'User not found';

const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}api`,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${Token.get() || ''}`,
	},
});

export default axiosInstance;
