using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;

namespace EProfspilka.Application.Services;

public class FileUserReader(ILogger<FileUserReader> logger) : IFileUserReader
{
    public List<FileUser> Read(string filePath)
    {
        if (string.IsNullOrEmpty(filePath))
        {
            throw new ArgumentException("File path cannot be null or empty");
        }

        var users = new List<FileUser>();

        var fileInfo = new FileInfo(filePath);
        try
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(fileInfo);

            var worksheet = package.Workbook.Worksheets[0];

            logger.LogInformation("File with path {FilePath} contain {CellsCount} cells count", filePath, worksheet.Cells.Count() - 1);

            for (var row = 2; row <= worksheet.Dimension.End.Row; row++)
            {
                users.Add(new FileUser(
                    worksheet.Cells[row, 1].Value.ToString() ?? string.Empty,
                    worksheet.Cells[row, 2].Value.ToString() ?? string.Empty,
                    worksheet.Cells[row, 3].Value.ToString() ?? string.Empty,
                    int.Parse(worksheet.Cells[row, 4].Value.ToString() ?? "1"),
                    BoolFileParser(worksheet.Cells[row, 5].Value.ToString() ?? "Ні")));
            }
            logger.LogInformation("Read {Count} users in file", users.Count);
            return users;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error when Reading file");
            throw new StudentsReadingException("Error when Reading file", ex);
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