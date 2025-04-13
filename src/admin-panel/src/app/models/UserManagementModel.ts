import { Role } from "./roles";

export interface UserManagementModel {
    id: string;
    email: string;
    fullName: string;
    roles: Role[];
    imageUrl?: string;
    course?: number;
    picture: string;
    lastLoginDateTimeUtc?: string;
    isActive: boolean;
    faculty: string;
}
