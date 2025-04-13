namespace EProfspilka.Core.Responses;

public class PaginationResponse<T> where T : class
{
    public IReadOnlyList<T> Data { get; set; } = Array.Empty<T>();

    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int Total { get; set; }

    public int TotalPages => (int)Math.Ceiling((double)Total / PageSize);

    public bool HasNext => PageNumber < TotalPages;
    public bool HasPrevious => PageNumber > 1;
}
