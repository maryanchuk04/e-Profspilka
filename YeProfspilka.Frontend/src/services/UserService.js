import { api } from "./config/axios.config"

export class UserService {
	#url = "/user"

	async get() {
		return await api.get(this.#url);
	}
}