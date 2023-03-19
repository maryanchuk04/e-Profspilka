import { advantagesMock } from "../utils/mocks"

export class AdvantagesService {
	#advantagesUrl = "/advantages"

	getAdvantages() {
		return advantagesMock;
	}
}