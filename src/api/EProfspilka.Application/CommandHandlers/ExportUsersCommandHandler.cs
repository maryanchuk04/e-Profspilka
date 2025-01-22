using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers;

public class ExportUsersCommand : IRequest<byte[]>
{
}

public class ExportUsersCommandHandler(
    EProfspilkaContext db,
    ILogger<ExportUsersCommandHandler> logger)
    : IRequestHandler<ExportUsersCommand, byte[]>
{
    public async Task<byte[]> Handle(ExportUsersCommand request, CancellationToken cancellationToken)
    {
        var users = await db.Users
            .ToListAsync(cancellationToken);

        logger.LogInformation("Was found {count} users in StudentStore table", users.Count);

        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        using var package = new ExcelPackage();

        var worksheet = package.Workbook.Worksheets.Add("Користувачі");

        // Title for columns
        worksheet.Cells[1, 1].Value = "Повне ім'я";
        worksheet.Cells[1, 2].Value = "Email";
        worksheet.Cells[1, 3].Value = "Факультет";
        worksheet.Cells[1, 4].Value = "Курс";
        worksheet.Cells[1, 5].Value = "Студент сплатив внески? (Так/Ні)";

        // Fill
        for (var i = 0; i < users.Count; i++)
        {
            var student = users[i];
            var row = i + 2;

            worksheet.Cells[row, 1].Value = student.FullName;
            worksheet.Cells[row, 2].Value = student.Email;
            worksheet.Cells[row, 3].Value = student.Faculty;
            worksheet.Cells[row, 4].Value = student.Course == 0 ? "не введено" : student.Course;
           // worksheet.Cells[row, 5].Value = student.IsMemberProf ? "Так" : "Ні";
        }

        logger.LogInformation("Finished creation bytes array for xlsx file");

        return await package.GetAsByteArrayAsync(cancellationToken);
    }
}
