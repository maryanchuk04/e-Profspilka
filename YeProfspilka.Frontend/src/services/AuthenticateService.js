import { api } from "./config/axios.config"

export class AuthenticateService {
	#url = "/authenticate"

	async authenticateGoogle({ name, picture, email, hd }) {
		try {
			const { status } = await api.post(this.#url, {
				fullName: name, 
				avatar: picture,
				email,
				hd
			});

			return status;
		}
		catch (error) {
			throw new error;
		} 
	}

}