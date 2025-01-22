using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using EProfspilka.Core.Entities;

namespace EProfspilka.Db.Configurations;

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
	public void Configure(EntityTypeBuilder<UserRole> builder)
	{
		builder.HasKey(a => new { a.UserId, RoleId = a.Id });
		builder.HasOne(a => a.User).WithMany(a => a.UserRoles).HasForeignKey(a => a.UserId);
		builder.HasOne(a => a.Role).WithMany(r => r.UserRoles).HasForeignKey(a => a.Id);
	}
}