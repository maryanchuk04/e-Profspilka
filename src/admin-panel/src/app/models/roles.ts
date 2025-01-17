export enum Role {
    NotVerified = 'notVerified',
    Student = 'student',
    MemberProfspilka = 'memberProfspilka',
    Moderator = 'moderator',
    HeadOfUnit = 'headOfUnit',
    Admin = 'admin',
}

export const roleResolver = (role: Role): string => {
    switch (role) {
        case Role.Admin:
            return 'Адміністратор';
        case Role.Student:
            return 'Студент';
        case Role.MemberProfspilka:
            return 'Член профспілки';
        case Role.Moderator:
            return 'Модератор';
        case Role.NotVerified:
            return 'Не верифікований';
        case Role.HeadOfUnit:
            return 'Голова підрозділу';
        default:
            return 'Не активований';
    }
};
