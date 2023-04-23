using System.Reflection;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;

namespace YeProfspilka.Db.EF;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> contextOptions)
		: base(contextOptions)
	{ }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);
		modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
	}

	public DbSet<User> Users { get; set; }

	public DbSet<UserRole> UserRoles { get; set; }

	public DbSet<UserToken> UserTokens { get; set; }

	public DbSet<Image> Images { get; set; }

	public DbSet<StudentStore> StudentsStore { get; set; }

	public DbSet<Event> Events { get; set; }

	public DbSet<EventImage> EventImages { get; set; }

	public DbSet<Role> Roles { get; set; }

	public DbSet<Mark> Marks { get; set; }

	public DbSet<Question> Questions { get; set; }

	public DbSet<Partner> Partners { get; set; }

	public DbSet<Advantage> Advantage { get; set; }
}