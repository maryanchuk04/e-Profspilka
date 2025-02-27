import { NextResponse } from 'next/server';

import { GoogleAuthRequest } from '@/models/auth';

import api from './config/axios.config';
import { ACCESS_TOKEN_COOKIE_NAME } from './config/cookies';

const endpoint = '/authenticate';

export const authenticateGoogle = async ({ name, picture, email, hd }: GoogleAuthRequest) => {
    try {
        const response = await api.post(`${endpoint}/google`, {
            fullName: name,
            avatar: picture,
            email,
            hd,
        });

        const token = response.data.token;

        if (!token) {
            throw new Error('No token received from backend');
        }

        const res = new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

        res.cookies.set(ACCESS_TOKEN_COOKIE_NAME, token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60,
        });

        return response;
    } catch (err) {
        console.error('Error authenticating with Google:', err);
        throw err;
    }
};
