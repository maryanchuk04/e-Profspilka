export type UserStatus = 'student' | 'member' | 'notVerified';

export enum Role {
    notVerified = 'notVerified',
    student = 'student',
    member = 'member',
    moderator = 'moderator',
    admin = 'admin',
}

export const roleResolver = (roles: Role[]): string => {
    console.log(roles);

    if (roles.includes(Role.admin))
        return 'Адміністратор';

    if (roles.includes(Role.moderator))
        return 'Модератор';

    if (roles.includes(Role.member))
        return 'Член профспілки';

    if (roles.includes(Role.student))
        return 'Студент';

    if (roles.includes(Role.notVerified))
        return 'Не підтверджено';

    return 'Не визначено';
};
