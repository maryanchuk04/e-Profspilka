using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class MembershipFees : BaseEntity
{
    public Guid UserId { get; set; }
    public DateTime PaidAtUtc { get; set; }
    public DateTime EndAtUtc { get; set; }

    public MembershipType MembershipType { get; set; }
}

public enum MembershipType
{
    Unknown = 0,
    ScholarshipHolder = 1,
    ManualPayment = 2,
}
