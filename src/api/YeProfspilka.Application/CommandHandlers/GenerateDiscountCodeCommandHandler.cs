using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class GenerateDiscountCodeCommand(Guid discountId) : IRequest<DiscountCodeDto>
{
    public Guid DiscountId { get; set; } = discountId;
}

public class GenerateDiscountCodeCommandHandler(
    YeProfspilkaContext db,
    IMapper mapper,
    ISecurityContext securityContext)
    : IRequestHandler<GenerateDiscountCodeCommand, DiscountCodeDto>
{
    private readonly YeProfspilkaContext _db = db ?? throw new ArgumentException(nameof(YeProfspilkaContext));
    private readonly IMapper _mapper = mapper ?? throw new ArgumentException(nameof(IMapper));
    private readonly ISecurityContext _securityContext = securityContext ?? throw new ArgumentException(nameof(ArgumentException));

    public async Task<DiscountCodeDto> Handle(GenerateDiscountCodeCommand request, CancellationToken cancellationToken)
    {
        var discount = await _db.Discounts
            .SingleOrDefaultAsync(x => x.Id == request.DiscountId, cancellationToken);

        if (discount is null)
        {
            throw new NotFoundException(nameof(Discount), request.DiscountId);
        }

        var discountCode = GenerateDiscountCode(discount);

        await _db.DiscountCodes.AddAsync(discountCode, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DiscountCodeDto>(discountCode);
    }

    private DiscountCode GenerateDiscountCode(Discount discount)
    {
        return new DiscountCode
        {
            IsActive = true,
            Code = Guid.NewGuid(),
            Discount = discount,
            Id = Guid.NewGuid(),
            ActivateTimeUtc = DateTime.Now,
            DeactivateTimeUtc = DateTime.Now.AddMinutes(1),
            UserId = _securityContext.GetCurrentUserId(),
        };
    }
}