using Microsoft.EntityFrameworkCore;
using System.Reflection;
using EProfspilka.Core.Entities;

namespace EProfspilka.Db.EF;

public class EProfspilkaContext(DbContextOptions<EProfspilkaContext> contextOptions) : DbContext(contextOptions)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.EnableSensitiveDataLogging(false);
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

    public DbSet<Discount> Discounts { get; set; }

    public DbSet<DiscountCode> DiscountCodes { get; set; }
}