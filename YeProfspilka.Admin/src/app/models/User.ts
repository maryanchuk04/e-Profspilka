import { Role } from './roles';

export interface User {
	id: string;
	fullName: string;
	email: string;
	role: Role;
	avatar: string;
	faculty: string | null;
	course: number | null;
}
