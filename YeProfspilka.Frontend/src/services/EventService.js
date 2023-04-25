import { eventsMock } from "../utils/mocks";
// import { api } from "./config/axios.config";
import { ApiService } from "./config/ApiService";

export class EventService {
	#eventUrl = '/events';

	constructor() {
		this.api = new ApiService();
	}

	getEvents() {
		return eventsMock;
	}

	getEventById(id) {
		return this.api.get(`${this.#eventUrl}/${id}`);
	}
}