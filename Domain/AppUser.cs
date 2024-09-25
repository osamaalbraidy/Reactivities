using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        // Define an enum for Role
        // public RoleType Role { get; set; }

        public ICollection<ActivityAttendee> Activities { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
    // public enum RoleType
    // {
    //     Admin,
    //     User,
    //     Employee
    // }
}
