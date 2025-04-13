using EProfspilka.Core.Requests;
using EProfspilka.Core.Responses;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EProfspilka.Application.QueryHandlers;

public class GetUsersQuery(PaginationRequest pagination) : IRequest<PaginationResponse<UserManagementModel>>
{
    public PaginationRequest Pagination { get; } = pagination;
}

public class GetUsersQueryHandler(EProfspilkaContext db)
    : IRequestHandler<GetUsersQuery, PaginationResponse<UserManagementModel>>
{
    public async Task<PaginationResponse<UserManagementModel>> Handle(GetUsersQuery request,
        CancellationToken cancellationToken)
    {
        var pagination = request.Pagination;

        var usersQuery = db.Users.AsQueryable();

        if (!string.IsNullOrWhiteSpace(pagination.SearchTerm))
        {
            var term = pagination.SearchTerm.ToLower();
            usersQuery = usersQuery.Where(user =>
                user.Email.ToLower().Contains(term) ||
                user.FullName.ToLower().Contains(term));
        }

        var totalUsersCount = await usersQuery.CountAsync(cancellationToken);

        var users = await usersQuery
            .OrderByDescending(u => u.CreatedDateUtc)
            .AsNoTracking()
            .AsSplitQuery()
            .Include(u => u.UserRoles)
            .Include(u => u.Image)
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync(cancellationToken);

        var mapped = users.Select(user => new UserManagementModel
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Roles = user.UserRoles.Select(r => r.RoleId).ToList(),
            IsActive = user.IsActive,
            LastLoginDateTimeUtc = user.LastLoginDateTimeUtc,
            Course = user.Course,
            Faculty = user.Faculty,
            Picture = user.Image?.ImageUrl
        }).ToList();

        return new PaginationResponse<UserManagementModel>
        {
            Data = mapped,
            Total = totalUsersCount,
            PageNumber = pagination.PageNumber,
            PageSize = pagination.PageSize
        };
    }
}