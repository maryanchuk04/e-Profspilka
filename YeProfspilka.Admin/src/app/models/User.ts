import { Role } from './roles';

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: Role;
    avatar: string;
    facultet: string | null;
    course: number | null;
}
