import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN_COOKIE_NAME } from '@/apis/config/cookies';

const tokenMaxAge = 60 * 60 * 12; // ⏳ Token life - 12 hours

/**
 * @summary Callback route to which the API backend is redirected in order to save the JWT Token in the cookie.
 */
export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/?loginState=true', req.url));
    }

    (await cookies()).set(ACCESS_TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'none',
        maxAge: tokenMaxAge,
    });

    return NextResponse.redirect(new URL('/', req.url));
}
