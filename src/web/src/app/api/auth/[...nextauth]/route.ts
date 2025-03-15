import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

import { ACCESS_TOKEN_COOKIE_NAME } from '@/apis/config/cookies';

import { getCurrentUserFromToken } from '../../parse-jwt';
import { backendApiGoogleCallbackUri } from '../settings';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
            authorization: {
                url: 'https://accounts.google.com/o/oauth2/auth',
                params: {
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    redirect_uri: backendApiGoogleCallbackUri,
                    response_type: 'code',
                    scope: 'openid email profile',
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
            checks: ['state'],
        }),
    ],
    callbacks: {
        async session({ session }: any) {
            const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;

            if (token) {
                try {
                    session.user = getCurrentUserFromToken(token);
                    session.accessToken = token;
                } catch (error) {
                    console.error('❌ Error during parsing token', error);
                }
            } else {
                console.warn('❌ Token was not found');
            }

            return session;
        },
        async jwt({ token }: any) {
            return token;
        },
    },
    cookies: {
        sessionToken: {
            name: ACCESS_TOKEN_COOKIE_NAME,
            options: {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 60 * 60 * 12,
                path: '/',
            },
        },
    },
    session: {
        strategy: 'jwt',
        updateAge: 0,
    },
    jwt: {
        encode: async () => {
            const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
            return token || '';
        },
        decode: async ({ token }): Promise<any> => {
            return getCurrentUserFromToken(token!);
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

export const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
