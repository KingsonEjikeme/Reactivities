using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        
            private IMapper _mapper { get; }
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity, activity);

                activity.Title = request.Activity.Title ?? activity.Title;
                activity.Description = request.Activity.Description ?? activity.Description;
                activity.Venue = request.Activity.Venue ?? activity.Venue;
                activity.City = request.Activity.City ?? activity.City;
                // activity.Date = request.Activity.Date ?? activity.Date;

                await _context.SaveChangesAsync();
            }
        }

    }
}