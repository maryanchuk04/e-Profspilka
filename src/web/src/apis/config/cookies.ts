export const ACCESS_TOKEN_COOKIE_NAME = 'e_profspilka_access_token';
export const REFRESH_TOKEN_COOKIE_NAME = 'e_profspilka_refresh_token';

export const getAuthCookiesHeaders = async (): Promise<HeadersInit> => {
    if (typeof window !== 'undefined') {
        return new Headers();
    }

    const { cookies } = await import('next/headers');
    const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME);

    return { Cookie: `${token?.name}=${token?.value}` };
};