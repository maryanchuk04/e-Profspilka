// import { api } from "./config/axios.config";
import { ApiService } from "./config/ApiService";

export class EventService {
	#eventUrl = '/event';

	constructor() {
		this.api = new ApiService();
	}

	async getEvents() {
		return await this.api.get(this.#eventUrl);
	}

	async getEventById(id) {
		return await this.api.get(`${this.#eventUrl}/${id}`);
	}
}