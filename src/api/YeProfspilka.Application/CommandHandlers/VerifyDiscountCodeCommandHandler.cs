using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Enumerations;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class VerifyDiscountCodeCommand(Guid discountId, Guid discountCodeId) : IRequest<VerifyDiscountResult>
{
    public Guid DiscountId { get; set; } = discountId;
    public Guid DiscountCode { get; set; } = discountCodeId;
}


public class VerifyDiscountCodeCommandHandler(YeProfspilkaContext db, IMapper mapper)
    : IRequestHandler<VerifyDiscountCodeCommand, VerifyDiscountResult>
{
    public async Task<VerifyDiscountResult> Handle(VerifyDiscountCodeCommand request, CancellationToken cancellationToken)
    {
        var discountCode = await db.DiscountCodes
            .Include(x => x.Discount)
            .Include(x => x.User)
            .ThenInclude(x => x.Image)
            .FirstOrDefaultAsync(x => x.Code == request.DiscountCode
                                      && x.DiscountId == request.DiscountId,
                cancellationToken);

        if (discountCode == null)
        {
            throw new NotFoundException(nameof(DiscountCode), request.DiscountCode);
        }

        if (!discountCode.IsActive)
        {
            return new VerifyDiscountResult { IsSuccess = false };
        }

        // Add seconds needed for add user more time for validate request
        if (discountCode.DeactivateTimeUtc >= DateTime.UtcNow.AddSeconds(5))
        {
            discountCode.IsActive = false;

            await db.SaveChangesAsync(cancellationToken);

            return new VerifyDiscountResult
            {
                IsSuccess = true,
                Discount = mapper.Map<DiscountDto>(discountCode.Discount),
                Email = discountCode.User?.Email,
                FullName = discountCode.User?.FullName,
                Image = discountCode.User?.Image.ImageUrl,
            }; ;
        }

        return new VerifyDiscountResult { IsSuccess = false };
    }

    private async Task CheckDiscountType(Discount discount)
    {
        if (discount.DiscountType == DiscountType.OneTimeForAll)
        {
            // TODO: Finalize with this!
            // if this onetime discount, it must be hide for this user
        }
    }
}