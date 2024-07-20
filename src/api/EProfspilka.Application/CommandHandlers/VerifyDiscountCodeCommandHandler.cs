using AutoMapper;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Enumerations;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EProfispilka.Application.CommandHandlers;

public class VerifyDiscountCodeCommand(Guid discountId, Guid discountCodeId) : IRequest<VerifyDiscountResult>
{
    public Guid DiscountId { get; set; } = discountId;
    public Guid DiscountCode { get; set; } = discountCodeId;
}


public class VerifyDiscountCodeCommandHandler(EProfspilkaContext db, IMapper mapper) : IRequestHandler<VerifyDiscountCodeCommand, VerifyDiscountResult>
{
    public async Task<VerifyDiscountResult> Handle(VerifyDiscountCodeCommand request, CancellationToken cancellationToken)
    {
        var discountCode = await db.DiscountCodes
            .Include(x => x.Discount)
            .Include(x => x.User)
            .ThenInclude(x => x.Image)
            .FirstOrDefaultAsync(x => x.Code == request.DiscountCode
                                      && x.DiscountId == request.DiscountId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(DiscountCode), request.DiscountCode);

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