import { eventsMock } from "../utils/mocks";
// import { api } from "./config/axios.config";

export class EventService {
	#eventUrl = '/events';

	getEvents() {
		return eventsMock;
	}
}