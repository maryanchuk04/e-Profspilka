export enum Role {
	NotVerified = 0,
	Student = 1,
	MemberProfspilka = 2,
	Moderator = 3,
	HeadOfUnit = 4,
	Admin = 5,
}

export const roleResolver = (role: Role): string => {
	switch (role) {
		case Role.Admin: return 'Адміністратор';
		case Role.Student: return 'Студент';
		case Role.MemberProfspilka: return 'Член профспілки';
		case Role.Moderator: return 'Модератор';
		case Role.NotVerified: return 'Не верифікований';
		case Role.HeadOfUnit: return 'Голова підрозділу';
		default:
			return "Юзер не активований"
	}
}