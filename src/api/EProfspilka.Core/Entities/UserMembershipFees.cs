namespace EProfspilka.Core.Entities;

public class UserMembershipFees
{
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid MembershipFeesId { get; set; }
    public MembershipFees MembershipFees { get; set; }
}
