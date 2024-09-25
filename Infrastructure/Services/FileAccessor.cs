using Application.Interfaces;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public class FileAccessor : IFileAccessor
    {
        private readonly string _uploadsBaseFolder;

        public FileAccessor()
        {
            _uploadsBaseFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");

            if (!Directory.Exists(_uploadsBaseFolder))
            {
                Directory.CreateDirectory(_uploadsBaseFolder);
            }
        }

        public async Task<UploadFileResult> UploadFileAsync(IFormFile file, string allowedExtensionsType = "images", string folderType = "images")
        {
            try
            {
                string[] allowedExtensions;

                // Determine allowed extensions based on file type
                switch (allowedExtensionsType.ToLower())
                {
                    case "files":
                        allowedExtensions = new[] { ".jpg", ".png", ".jpeg", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt" };
                        break;
                    case "images":
                    default:
                        allowedExtensions = new[] { ".jpg", ".png", ".jpeg", ".gif", ".bmp", ".tiff" };
                        break;
                }

                var specificFolder = Path.Combine(_uploadsBaseFolder, folderType);
                if (!Directory.Exists(specificFolder))
                {
                    Directory.CreateDirectory(specificFolder);
                }

                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(fileExtension))
                {
                    throw new InvalidOperationException("Invalid file type.");
                }

                // Generate a unique file name (ID)
                var randomFileName = Guid.NewGuid().ToString("N");
                var uniqueFileName = $"{randomFileName}{fileExtension}";
                var filePath = Path.Combine(specificFolder, uniqueFileName);

                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Return the file URL and random file name (ID)
                var url = $"/uploads/{folderType}/{uniqueFileName}";
                return new UploadFileResult
                {
                    Url = url,
                    Id = randomFileName
                };
            }
            catch (Exception ex)
            {
                // Log the error if needed
                throw new Exception($"An error occurred while uploading the file: {ex.Message}");
            }
        }


        public async Task<bool> DeleteFileAsync(string id, AppUser user)
        {
            try
            {
                var photo = user.Photos.FirstOrDefault(x => x.Id == id);

                if (photo == null)
                {
                    return false;
                }

                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", photo.Url.TrimStart('/'));

                Console.WriteLine($"Full path: {fullPath}");

                if (File.Exists(fullPath))
                {
                    await Task.Run(() => File.Delete(fullPath));
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the file: {ex.Message}");
            }
        }

    }
}
