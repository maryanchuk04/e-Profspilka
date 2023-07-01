using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class VerifyDiscountCodeCommand : IRequest<bool>
{
    public VerifyDiscountCodeCommand(Guid discountId, Guid discountCodeId)
    {
        DiscountId = discountId;
        DiscountCodeId = discountCodeId;
    }

    public Guid DiscountId { get; set; }
    public Guid DiscountCodeId { get; set; }
}


public class VerifyDiscountCodeCommandHandler : IRequestHandler<VerifyDiscountCodeCommand, bool>
{
    private readonly YeProfspilkaContext _db;

    public VerifyDiscountCodeCommandHandler(YeProfspilkaContext db)
    {
        _db = db;
    }

    public async Task<bool> Handle(VerifyDiscountCodeCommand request, CancellationToken cancellationToken)
    {
        var discountCode = await _db.DiscountCodes
            .Include(x => x.Discount)
            .FirstOrDefaultAsync(x => x.Id == request.DiscountCodeId
                                      && x.DiscountId == request.DiscountId,
                cancellationToken);

        if (discountCode == null)
        {
            throw new NotFoundException(nameof(DiscountCode), request.DiscountCodeId);
        }

        if (!discountCode.IsActive)
        {
            return false;
        }

        // Add seconds needed for add user more time for validate request
        if (discountCode.DeactivateTimeUtc >= DateTime.UtcNow.AddSeconds(10))
        {
            discountCode.IsActive = false;

            _db.DiscountCodes.Update(discountCode);
            await _db.SaveChangesAsync(cancellationToken);

            return false;
        }

        return true;
    }
}