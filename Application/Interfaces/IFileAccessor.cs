using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IFileAccessor
    {
        Task<UploadFileResult> UploadFileAsync(IFormFile file, string allowedExtensionsType = "images", string folderType = "images");
        Task<bool> DeleteFileAsync(string id, AppUser user);
    }
}