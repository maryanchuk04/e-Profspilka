namespace EProfspilka.Core.Enumerations;

[Flags]
public enum DiscountType
{
    None = 0,                          // 0
    AvailableForAll = 1 << 0,          // 1
    AvailableForMemberOfProf = 1 << 1, // 2
    OneTimeForAll = 1 << 2,            // 4
    OneTimeForMemberOfProf = 1 << 3,   // 8
    OneTimeForFirstCourse = 1 << 4,    // 16
}