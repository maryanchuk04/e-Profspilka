import axios from 'axios';

export const googleDataProvider = async (token) => {
	try {
		const { data } = await axios.get(
			`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
		);
		return data;
	} catch (err) {
		throw Error(err);
	}
};
