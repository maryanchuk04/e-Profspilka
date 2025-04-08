import { jwtDecode } from 'jwt-decode';

import { CurrentUser } from '@/models/user';

export function getCurrentUserFromToken(token: string): CurrentUser | null {
    try {
        if (!token) {
            console.warn("❌ [getCurrentUserFromToken] No token provided.");
            return null;
        }

        const decoded: any = jwtDecode(token);

        return {
            id: decoded["https://e-profspilka.com.ua/userId"],
            fullName: decoded["https://e-profspilka.com.ua/fullName"],
            faculty: decoded["https://e-profspilka.com.ua/faculty"],
            email: decoded["https://e-profspilka.com.ua/email"],
            picture: decoded["https://e-profspilka.com.ua/picture"],
            isActive: decoded["https://e-profspilka.com.ua/isActive"] === "True",
            roles: decoded["https://e-profspilka.com.ua/roles"] || [],
            course: decoded["https://e-profspilka.com.ua/course"] || 0,
        };
    } catch (error) {
        console.error("❌ [getCurrentUserFromToken] Error decoding token:", error);
        return null;
    }
}
