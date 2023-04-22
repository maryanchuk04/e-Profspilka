import { ApiService } from "./config/ApiService";

export class PartnersService {
	#url = '/partners';
	#service = new ApiService();

	async getPartners() {
		return await this.#service.get(this.#url);
	}
}