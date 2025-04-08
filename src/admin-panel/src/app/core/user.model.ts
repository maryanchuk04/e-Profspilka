import { Role } from '../models/roles';

export interface CurrentUser {
    userId: string;
    fullName: string;
    faculty: string;
    isActive: boolean;
    email: string;
    picture: string;
    roles: Role[];
}
