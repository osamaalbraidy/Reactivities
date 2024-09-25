namespace API.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
        // public RoleType Role { get; set; }
    }
    // public enum RoleType
    // {
    //     Admin,
    //     User,
    //     Employee
    // }
}