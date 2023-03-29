using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YeProfspilka.Core.Entities;

namespace YeProfspilka.Db.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
	public void Configure(EntityTypeBuilder<Role> builder)
	{
		builder.HasData(new[]
		{
			new Role { Id = Core.Enumerations.Role.Student, Name = "Student" },
			new Role { Id = Core.Enumerations.Role.Admin, Name = "Admin" },
			new Role { Id = Core.Enumerations.Role.Moderator, Name = "Moderator" },
			new Role { Id = Core.Enumerations.Role.NotVerified, Name = "NotVerified" },
			new Role { Id = Core.Enumerations.Role.MemberProfspilka, Name = "MemberProfspilka" },
			new Role { Id = Core.Enumerations.Role.HeadOfUnit, Name = "HeadOfUnit" },
		});

		builder.HasKey(r => r.Id);
		builder.Property(r => r.Id).ValueGeneratedNever();
		builder.Property(r => r.Name).IsRequired().HasMaxLength(30);
	}
}
