import { Role } from "./roles";

export interface User {
	fullName: string;
	email: string;
	role: Role;
	avatar: string;
}
