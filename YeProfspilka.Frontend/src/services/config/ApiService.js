import axios from 'axios';
import { Token } from '../TokenService';

export class ApiService {
	constructor() {
		this.axios = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${Token.get() || ''}`,
			},
		});
	}

	post(url, data) {
		return this.axios.post(url, data);
	}

	get(url) {
		return this.axios.get(url, {
			Authorization: `Bearer ${Token.get() || ''}`,
		});
	}

	put(url, data) {
		return this.axios.put(url, data);
	}

	delete(url) {
		return this.axios.delete(url);
	}
}
