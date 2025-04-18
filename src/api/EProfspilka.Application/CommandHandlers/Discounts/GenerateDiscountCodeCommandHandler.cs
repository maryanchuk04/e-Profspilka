using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers.Discounts;

public class GenerateDiscountCodeCommand(Guid discountId) : IRequest<DiscountCodeDto>
{
    public Guid DiscountId { get; set; } = discountId;
}

public class GenerateDiscountCodeCommandHandler(
    EProfspilkaContext db,
    IMapper mapper,
    ISecurityContext securityContext)
    : IRequestHandler<GenerateDiscountCodeCommand, DiscountCodeDto>
{
    private readonly EProfspilkaContext _db = db ?? throw new ArgumentException(nameof(EProfspilkaContext));
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
            ActivateTimeUtc = DateTime.UtcNow,
            DeactivateTimeUtc = DateTime.UtcNow.AddMinutes(1),
            UserId = _securityContext.GetCurrentUserId(),
        };
    }
}