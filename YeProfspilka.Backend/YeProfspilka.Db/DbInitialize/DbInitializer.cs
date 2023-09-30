using YeProfspilka.Core.Entities;
using YeProfspilka.Db.EF;
using Role = YeProfspilka.Core.Enumerations.Role;

namespace YeProfspilka.Db.DbInitialize;

public static class DbInitializer
{
    public static void Seed(YeProfspilkaContext db)
    {
        SeedDefaultAdvantages(db);
        SeedDefaultQuestions(db);
        SeedSuperAdmin(db);

        db.SaveChanges();
    }

    private static void SeedDefaultAdvantages(YeProfspilkaContext db)
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

    private static void SeedDefaultQuestions(YeProfspilkaContext db)
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

    private static void SeedSuperAdmin(YeProfspilkaContext db)
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
            Facultet = "ФМІ",
            FullName = "Максим Васильович Мар'янчук",
            Image = new Image(string.Empty),
            UserRoles = new List<UserRole>
            {
                new()
                {
                    UserId = adminId,
                    RoleId = Role.Admin,
                },
                new()
                {
                    UserId = adminId,
                    RoleId = Role.Student,
                }
            },
            Student = new Student()
            {
                FullName = "Максим Васильович Мар'янчук",
                IsMemberProf = true,
                Course = 4,
                Email = "marianchuk.maksym@chnu.edu.ua",
                Facultet = "Мат Фак",
            }
        };

        db.Users.Add(admin);
    }
}