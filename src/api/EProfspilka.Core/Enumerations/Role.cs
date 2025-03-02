namespace EProfspilka.Core.Enumerations;

public enum Role : byte
{
    NotVerified = 0,
    Student = 1,
    Member = 2,
    Moderator = 3,
    Admin = byte.MaxValue,
}