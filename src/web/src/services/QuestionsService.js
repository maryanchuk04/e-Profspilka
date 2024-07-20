import { ApiService } from "./config/ApiService";

export class QuestionsService {
	#url = "/question"

	constructor() {
		this.api = new ApiService();
	}

	async get() {
		return await this.api.get(this.#url);
	}
}