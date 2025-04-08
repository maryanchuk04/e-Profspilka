using EProfspilka.Core.Entities;
using EProfspilka.Core.Enumerations;
using EProfspilka.Db.EF;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.Db.DbInitialize;

public static class DbInitializer
{
    public static void Seed(EProfspilkaContext db)
    {
        SeedDefaultAdvantages(db);
        SeedDefaultQuestions(db);
        SeedDiscounts(db);
        SeedSuperAdmin(db);

        db.SaveChanges();
    }

    private static void SeedDefaultAdvantages(EProfspilkaContext db)
    {
        if (db.Advantage.Any())
        {
            return;
        }

        var advantages = new List<Advantage>
        {
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Бали",
                SubText = "додаткові бали для рейтингу",
            },
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Економія",
                SubText = "власних коштів за допомогою «Профспілкової id картки студента ЧНУ»",
            },
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Відпочинок",
                SubText = "дешевий літній відпочинок на морі та в горах",
            },
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Студентське життя",
                SubText = "цікаве та незабутнє студентське життя (Посвяти, конкурси, вечірки та ін.)",
            },
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Нагороди",
                SubText = "преміювання у випадку активної громадської діяльності",
            },
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Робота",
                SubText = "пошук роботи за допомогою послуг «Університетського центру кар’єри»",
            },
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Допомога",
                SubText = "захист прав студентів та гарантії допомоги",
            },
            new()
            {
                Id = Guid.NewGuid(),
                MainText = "Реалізація",
                SubText = "самореалізація у комісіях та підрозділах профспілки університету",
            },
        };

        db.Advantage.AddRange(advantages);
    }

    private static void SeedDefaultQuestions(EProfspilkaContext db)
    {
        if (db.Questions.Any())
        {
            return;
        }

        var questions = new List<Question>
        {
            new()
            {
                Id = Guid.NewGuid(),
                QuestionText = "Хто такий профорг?",
                Answer =
                    "Профорг – це обраний студентами групи представник профспілки у академічній групі. Профгрупорг проводить свою роботу під керівництвом голови профспілкової організації студентів факультету/інституту/коледжу (профбюро студентів). Профгрупорг обирається серед членів профспілки групи на профспілкових зборах групи відкритим голосуванням за наявності на засіданні не менше двох третин членів профспілки групи терміном на 1 рік.",
            },
            new()
            {
                Id = Guid.NewGuid(),
                QuestionText = "Хто такий профорг?",
                Answer =
                    "Профорг – це обраний студентами групи представник профспілки у академічній групі. Профгрупорг проводить свою роботу під керівництвом голови профспілкової організації студентів факультету/інституту/коледжу (профбюро студентів). Профгрупорг обирається серед членів профспілки групи на профспілкових зборах групи відкритим голосуванням за наявності на засіданні не менше двох третин членів профспілки групи терміном на 1 рік.",
            },
        };

        db.Questions.AddRange(questions);
    }

    private static void SeedDiscounts(EProfspilkaContext db)
    {
        if (db.Discounts.Any())
            return;

        var discounts = new List<Discount>()
        {
            new()
            {
                Id = Guid.NewGuid(),
                AccessTypes = DiscountAccessType.QRCode | DiscountAccessType.PromoCode,
                CreatedDateUtc = DateTime.UtcNow,
                DiscountType = DiscountType.AvailableForAll,
                Description = "Якщо ви любите випити кави, ця пропозиція саме для вас!",
                Name = "Знижка 20% на лате від Bacara Coffe❤️‍🔥",
                State = DiscountState.Active,
                PromoCode = "PROFSPILKABACARA20",
            },
            new()
            {
                Id = Guid.NewGuid(),
                AccessTypes = DiscountAccessType.QRCode | DiscountAccessType.PromoCode,
                CreatedDateUtc = DateTime.UtcNow,
                DiscountType = DiscountType.OneTimeForMembers,
                Description = "ЩЕ БІЛЬШЕ КАВИ! Якщо ви любите випити кави, ця пропозиція саме для вас! Bacara Coffe дарує одноразову знижку в 40% для кожного члена профспілки!",
                Name = "Знижка 40% на лате від Bacara Coffe",
                State = DiscountState.Active,
                PromoCode = "PROFSPILKABACARA40",
            }
        };

        db.Discounts.AddRange(discounts);
        db.SaveChanges();
    }

    private static void SeedSuperAdmin(EProfspilkaContext db)
    {
        if (db.Users.Any())
        {
            return;
        }

        var adminId = Guid.NewGuid();

        var admin = new User
        {
            Id = adminId,
            Email = "marianchuk.maksym@chnu.edu.ua",
            Faculty = "ФМІ",
            Image = new() { Id = Guid.NewGuid(), ImageUrl = "https://lh3.googleusercontent.com/a/ACg8ocKRehp3a4owyAgaI_uiQgJ6xbVmcOf-VugDuo7XnJXoKw=s576-c-no" },
            FullName = "Максим Васильович Мар'янчук",
            UserRoles =
            [
                new UserRole
                {
                    UserId = adminId,
                    RoleId = Role.Admin,
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                },
                new UserRole
                {
                    UserId = adminId,
                    RoleId = Role.Student,
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                },
                new UserRole
                {
                    UserId = adminId,
                    RoleId = Role.Member,
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                }
            ],
        };

        var discounts = db.Discounts.Where(d => d.State == DiscountState.Active).Select(d => d.Id).ToList();
        var adminDiscounts = new List<UserDiscounts>();
        
        foreach (var id in discounts)
        {
            adminDiscounts.Add(
                new UserDiscounts
                {
                    DiscountId = id,
                    UserId = adminId,
                    CreatedDateUtc = DateTime.UtcNow,
                    IsAvailable = true,
                    UsedCount = 0,
                });
        }

        db.Users.Add(admin);
        db.UserDiscounts.AddRange(adminDiscounts);
    }
}