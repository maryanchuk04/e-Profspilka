const TOKEN_KEY = "token";

export const Token = {
	set: (token) => {
		localStorage.setItem(TOKEN_KEY, token);
	},
	get: () => {
		return localStorage.getItem(TOKEN_KEY);
	}
}