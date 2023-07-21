using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Enumerations;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class VerifyDiscountCodeCommand : IRequest<VerifyDiscountResult>
{
    public VerifyDiscountCodeCommand(Guid discountId, Guid discountCodeId)
    {
        DiscountId = discountId;
        DiscountCodeId = discountCodeId;
    }

    public Guid DiscountId { get; set; }
    public Guid DiscountCodeId { get; set; }
}


public class VerifyDiscountCodeCommandHandler : IRequestHandler<VerifyDiscountCodeCommand, VerifyDiscountResult>
{
    private readonly YeProfspilkaContext _db;
    private readonly IMapper _mapper;

    public VerifyDiscountCodeCommandHandler(YeProfspilkaContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<VerifyDiscountResult> Handle(VerifyDiscountCodeCommand request, CancellationToken cancellationToken)
    {
        var discountCode = await _db.DiscountCodes
            .Include(x => x.Discount)
            .Include(x => x.User)
            .ThenInclude(x => x.Image)
            .FirstOrDefaultAsync(x => x.Id == request.DiscountCodeId
                                      && x.DiscountId == request.DiscountId,
                cancellationToken);

        if (discountCode == null)
        {
            throw new NotFoundException(nameof(DiscountCode), request.DiscountCodeId);
        }

        if (!discountCode.IsActive)
        {
            return new VerifyDiscountResult { IsSuccess = false };
        }

        // Add seconds needed for add user more time for validate request
        if (discountCode.DeactivateTimeUtc >= DateTime.UtcNow.AddSeconds(5))
        {
            discountCode.IsActive = false;

            await _db.SaveChangesAsync(cancellationToken);

            return new VerifyDiscountResult { IsSuccess = false };
        }

        return new VerifyDiscountResult
        {
            IsSuccess = true,
            Discount = _mapper.Map<DiscountDto>(discountCode.Discount),
            Email = discountCode.User?.Email,
            FullName = discountCode.User?.FullName,
            Image = discountCode.User?.Image.ImageUrl,
        };
    }

    private async Task CheckDiscountType(Discount discount)
    {
        if (discount.DiscountType == DiscountType.OneTimeForAll)
        {

        }
    }
}