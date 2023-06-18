using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class GenerateDiscountCodeCommand : IRequest<DiscountCodeDto>
{
    public GenerateDiscountCodeCommand(Guid discountId)
    {
        DiscountId = discountId;
    }

    public Guid DiscountId { get; set; }
}

public class GenerateDiscountCodeCommandHandler : IRequestHandler<GenerateDiscountCodeCommand, DiscountCodeDto>
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;
    private readonly ISecurityContext _securityContext;

    public GenerateDiscountCodeCommandHandler(
        AppDbContext db,
        IMapper mapper,
        ISecurityContext securityContext)
    {
        _db = db ?? throw new ArgumentException(nameof(AppDbContext));
        _mapper = mapper ?? throw new ArgumentException(nameof(IMapper));
        _securityContext = securityContext;
    }

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