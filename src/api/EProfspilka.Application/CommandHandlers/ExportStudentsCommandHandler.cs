using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers;

public class ExportStudentsCommand : IRequest<byte[]>
{
}

public class ExportStudentsCommandHandler(
    YeProfspilkaContext db,
    ILogger<ExportStudentsCommandHandler> logger)
    : IRequestHandler<ExportStudentsCommand, byte[]>
{
    public async Task<byte[]> Handle(ExportStudentsCommand request, CancellationToken cancellationToken)
    {
        var users = await db.StudentsStore.ToListAsync(cancellationToken);

        logger.LogInformation("Was found {count} users in StudentStore table", users.Count);

        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        using var package = new ExcelPackage();

        var worksheet = package.Workbook.Worksheets.Add("Користувачі");

        // Title for columns
        worksheet.Cells[1, 1].Value = "Повне ім'я";
        worksheet.Cells[1, 2].Value = "Email";
        worksheet.Cells[1, 3].Value = "Факультет";
        worksheet.Cells[1, 4].Value = "Курс";
        worksheet.Cells[1, 5].Value = "Є членом профспілки (Так/Ні)";

        // Fill
        for (int i = 0; i < users.Count; i++)
        {
            var student = users[i];
            var row = i + 2;

            worksheet.Cells[row, 1].Value = student.FullName ?? string.Empty;
            worksheet.Cells[row, 2].Value = student.Email ?? string.Empty;
            worksheet.Cells[row, 3].Value = student.Facultet ?? string.Empty;
            worksheet.Cells[row, 4].Value = student.Course == 0 ? "не введено" : student.Course;
            worksheet.Cells[row, 5].Value = student.IsMemberProf ? "Так" : "Ні";
        }

        logger.LogInformation("Finished creation bytes array for xlsx file");

        return package.GetAsByteArray();
    }
}
