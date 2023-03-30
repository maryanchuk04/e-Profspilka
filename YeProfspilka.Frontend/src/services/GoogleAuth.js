import axios from 'axios';

export const googleAuthenticate = async (token) => {
	try {
		const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
		console.log(data);
	}
	catch (err) {
		throw new err;
	}

}