namespace YeProfspilka.Core.Enumerations;

public enum Role
{
	NotVerified = 0,
	Student = 1,
	MemberProfspilka = 2,
	Moderator = 3,
	// Head of unit. This persistent add Admin
	HeadOfUnit = 4,
	Admin = 5,
}