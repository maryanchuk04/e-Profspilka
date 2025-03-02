import { CurrentUser } from './user';

export type UserStatus = 'student' | 'member' | 'notVerified';

export enum Role {
    notVerified = 'notVerified',
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
    if (!isUserVerified(user)) return 'notVerified';

    return user.roles.includes(Role.member) ? 'member' : 'student';
};

export const getUserStatusLabel = (user: CurrentUser): string => {
    const userStatus = checkUserStatus(user);

    if (userStatus === 'member')
        return "Член профіспілки";

    if (userStatus === 'student')
        return "Студент"

    return 'Не визначено';
}
