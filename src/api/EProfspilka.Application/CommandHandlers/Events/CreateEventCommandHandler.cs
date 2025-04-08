using System.Collections.Concurrent;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Infrastructure.FileStorage;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace EProfspilka.Application.CommandHandlers.Events;

public class CreateEventCommand(EventDto eventDto, IFormFileCollection? images) : IRequest
{
    public EventDto Event { get; set; } = eventDto;
    public IFormFileCollection? Images { get; set; } = images;
}

public class CreateEventCommandHandler(IEventService eventService, IImageStorage imageStorage) : IRequestHandler<CreateEventCommand>
{
    public async Task Handle(CreateEventCommand request, CancellationToken cancellationToken)
    {
        var imageUrls = new ConcurrentBag<string>();

        var options = new ParallelOptions()
        {
            MaxDegreeOfParallelism = 3,
        };

        if (request.Images != null)
        {
            await Parallel.ForEachAsync(request.Images, options, async (image, ct) =>
            {
                using var ms = new MemoryStream();
                await image.CopyToAsync(ms, cancellationToken);
                var base64 = Convert.ToBase64String(ms.ToArray());
                var url = await imageStorage.UploadAsync(base64);
                imageUrls.Add(url);
            });
        }

        request.Event.Images = imageUrls.ToArray();

        await eventService.Create(request.Event);
    }
}