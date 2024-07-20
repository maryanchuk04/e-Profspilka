using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;

namespace EProfispilka.Application.Services;

public class StudentsReader(ILogger<StudentsReader> logger) : IStudentsReader
{
    public List<StudentStore> Read(string filePath)
    {
        if (string.IsNullOrEmpty(filePath))
        {
            throw new ArgumentException("File path cannot be null or empty");
        }

        var students = new List<StudentStore>();

        var fileInfo = new FileInfo(filePath);
        try
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(fileInfo);

            var worksheet = package.Workbook.Worksheets[0];
            logger.LogInformation("File with path {FilePath} contain {CellsCount} cells count", filePath,
                worksheet.Cells.Count() - 1);

            for (var row = 2; row <= worksheet.Dimension.End.Row; row++)
            {
                var res = worksheet.Cells[row, 1].Value.ToString();
                students.Add(new StudentStore()
                {

                    FullName = worksheet.Cells[row, 1].Value.ToString() ?? string.Empty,
                    Email = worksheet.Cells[row, 2].Value.ToString() ?? string.Empty,
                    Facultet = worksheet.Cells[row, 3].Value.ToString() ?? string.Empty,
                    Course = int.Parse(worksheet.Cells[row, 4].Value.ToString() ?? "1"),
                    IsMemberProf = BoolFileParser(worksheet.Cells[row, 5].Value.ToString() ?? "Ні"),
                });
            }
            logger.LogInformation("Read {Count} students in file", students.Count);
            return students;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error when Reading file");
            throw new StudentsReadingException("Error when Reading file");
        }
    }

    private static bool BoolFileParser(string colValue)
    {
        return colValue.ToLower() switch
        {
            "так" => true,
            "ні" => false,
            _ => false
        };
    }
}