const TOKEN_KEY = 'token';

export const setAccessToken = (token: string) => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
}

export const getAccessToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const removeAccessToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
}
