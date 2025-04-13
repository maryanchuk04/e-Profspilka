namespace EProfspilka.Core.Responses;

public class OperationResponse
{
    /// <summary>
    /// Operation successfulness flag
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// Operation error code
    /// </summary>
    public string ErrorCode { get; set; }

    public OperationResponse()
    {
        Success = true;
    }

    public OperationResponse(bool success, string errorCode = null)
    {
        Success = success;
        ErrorCode = errorCode;
    }

    public static OperationResponse CreateError(string errorCode = null) => new OperationResponse(false, errorCode);
    public static OperationResponse CreateSuccess() => new OperationResponse();
}