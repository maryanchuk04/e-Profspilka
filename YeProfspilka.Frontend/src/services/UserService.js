import { ApiService } from "./config/ApiService";

export class UserService {
	#url = "/user"
	
	constructor() {
		this.api = new ApiService();
	}

	async get() {
		return await this.api.get(this.#url);
	}
}