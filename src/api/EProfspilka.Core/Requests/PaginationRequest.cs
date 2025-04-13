using System.ComponentModel.DataAnnotations;

namespace EProfspilka.Core.Requests;

public class PaginationRequest
{
    [Range(1, 100, ErrorMessage = "PageSize must be between 1 and 100")]
    public int PageSize { get; set; } = 20;

    [Range(1, int.MaxValue, ErrorMessage = "PageNumber must be 1 or greater")]
    public int PageNumber { get; set; } = 1;

    public string SearchTerm { get; set; }
}
