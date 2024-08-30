const TOKEN_KEY = 'token';

export const Token = {
    set: (token) => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    },
    get: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
    remove: () => {
        localStorage.removeItem(TOKEN_KEY);
    },
};
