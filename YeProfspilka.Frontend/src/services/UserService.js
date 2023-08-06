import { ApiService } from './config/ApiService';
import { Token } from './TokenService';

export class UserService {
	#url = '/user';

	constructor() {
		this.api = new ApiService();
	}

	async get(token = null) {
		return await this.api.get(this.#url, {
			Authorization: `Bearer ${token ?? Token.get() ?? ''}`,
		});
	}
}
