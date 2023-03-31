import { ApiService } from "./config/ApiService";
import { Token } from "./TokenService";

export class AuthenticateService {
	#url = "/authenticate"
	api = new ApiService();

	async authenticateGoogle({ name, picture, email, hd }) {
		try {
			const { status, data } = await this.api.post(`${this.#url}/google`, {
				fullName: name, 
				avatar: picture,
				email,
				hd
			});
			
			if (data.token) {
				Token.set(data.token);
				return status;
			}
		}
		catch (err) {
			throw Error(err);
		} 
	}
}