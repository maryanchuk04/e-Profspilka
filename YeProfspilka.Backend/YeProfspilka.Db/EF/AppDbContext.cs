using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;

namespace YeProfspilka.Db.EF;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> contextOptions)
		: base(contextOptions)
	{ }

	public DbSet<User> Users { get; set; }

	public DbSet<UserRole> UserRoles { get; set; }

	public DbSet<UserToken> UserTokens { get; set; }

	public DbSet<Image> Images { get; set; }

	public DbSet<StudentStore> StudentsStore { get; set; }

	public DbSet<Event> Events { get; set; }

	public DbSet<EventImage> EventImages { get; set; }
}