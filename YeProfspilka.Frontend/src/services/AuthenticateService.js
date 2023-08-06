import { ApiService } from './config/ApiService';
import { Token } from './TokenService';

export class AuthenticateService {
	#url = '/authenticate';
	api = new ApiService();

	async authenticateGoogle({ name, picture, email, hd }) {
		try {
			const response = await this.api.post(`${this.#url}/google`, {
				fullName: name,
				avatar: picture,
				email,
				hd,
			});

			if (response.data.token) {
				Token.set(response.data.token);
				return { data: response.data, status: response.status };
			}
		} catch (err) {
			throw Error(err);
		}
	}

	logout() {
		return this.api.post(`${this.#url}/logout`);
	}
}
