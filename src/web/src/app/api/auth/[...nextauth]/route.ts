import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],

    callbacks: {
        async signIn(params: any) {
            const { profile } = params;
            console.log('profile', profile);
            console.log('params', params);

            // try {
            //     const res = await fetch(`${process.env.GATEWAY_BASE_ADDRESS}/api/authenticate`, { method: 'POST' });
            //     if (!res.ok) {
            //         return false;
            //     }
            //     await res.json();

            //     return true;
            // } catch (err) {
            //     console.log('Something happened: ', err);
            //     return false;
            // }

            return true;
        },
    },
});

export { handler as GET, handler as POST };
