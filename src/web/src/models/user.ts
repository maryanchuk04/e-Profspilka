import { JWT } from 'next-auth/jwt';

import { Role } from './role';

export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    facultet: string | null;
    course: number | null;
}

export interface CurrentUser extends JWT {
    id: string;
    fullName: string;
    faculty: string;
    email: string;
    picture: string;
    isActive: boolean;
    roles: Role[];
    course: number;
}
