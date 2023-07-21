import { Token } from '../TokenService';
import api from './axios.config';

export class ApiService {
	post(url, data) {
		return api.post(url, data);
	}

	get(url) {
		return api.get(url, {
			Authorization: `Bearer ${Token.get() || ''}`,
		});
	}

	put(url, data) {
		return api.put(url, data);
	}

	delete(url) {
		return api.delete(url);
	}
}
