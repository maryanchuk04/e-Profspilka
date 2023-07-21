import axios from 'axios';
import { Token } from '../TokenService';

export const USER_NOT_FOUND = 'User not found';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${Token.get() || ''}`,
	},
});

// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		// Any status code that lie within the range of 2xx cause this function to trigger
// 		// Do something with response data
// 		return response;
// 	},
// 	(error) => {
// 		if (error.response?.data?.message === USER_NOT_FOUND) {
// 			Token.remove();
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default axiosInstance;
