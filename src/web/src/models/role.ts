import { CurrentUser } from './user';

export type UserStatus = Role.student | Role.member | Role.notVerified;

export enum Role {
    notVerified = 'notverified',
    student = 'student',
    member = 'member',
    moderator = 'moderator',
    admin = 'admin',
}

export const isUserVerified = (user: CurrentUser): boolean => {
    if (!user) return false;

    if (user.roles.length === 0) return false;
    return !user.roles.includes(Role.notVerified);
};

export const checkUserStatus = (user: CurrentUser): UserStatus => {
    if (!isUserVerified(user)) return Role.notVerified;

    return user.roles.includes(Role.member) ? Role.member : Role.student;
};

export const getUserStatusLabel = (user: CurrentUser): string => {
    const userStatus = checkUserStatus(user);

    if (userStatus === Role.member)
        return "Член профіспілки";

    if (userStatus === Role.student)
        return "Студент"

    return 'Не визначено';
}
