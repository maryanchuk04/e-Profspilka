using EProfspilka.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EProfspilka.Db.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasData(
        [
            new() { Id = Core.Enumerations.Role.Student, Name = "Student" },
            new() { Id = Core.Enumerations.Role.Admin, Name = "Admin" },
            new() { Id = Core.Enumerations.Role.Moderator, Name = "Moderator" },
            new() { Id = Core.Enumerations.Role.NotVerified, Name = "NotVerified" },
            new() { Id = Core.Enumerations.Role.MemberProfspilka, Name = "MemberProfspilka" },
            new() { Id = Core.Enumerations.Role.HeadOfUnit, Name = "HeadOfUnit" },
        ]);
    }
}
