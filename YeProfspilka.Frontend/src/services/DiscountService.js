import { discountsMock } from "../utils/mocks";

export class DiscountService {
	#apiUrl = "/discount";

	getAll() {
		return discountsMock;
	}
}