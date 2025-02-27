import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { backendApiGoogleCallbackUri } from '../settings';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
            authorization: {
                url: "https://accounts.google.com/o/oauth2/auth",
                params: {
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    redirect_uri: backendApiGoogleCallbackUri,
                    response_type: "code",
                    scope: "openid email profile",
                    access_type: "offline",
                    prompt: "consent",
                },
            },
            checks: ["state"],
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
