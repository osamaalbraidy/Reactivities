using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IFileAccessor _fileAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IFileAccessor fileAccessor, IUserAccessor userAccessor)

            {
                _userAccessor = userAccessor;
                _fileAccessor = fileAccessor;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failer("You cannot delete your photo");

                var result = await _fileAccessor.DeleteFileAsync(photo.Id, user);

                if (result == false) return Result<Unit>.Failer("Problem deleting photo");

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failer("Problem deleting photo from API");
            }
        }
    }
}