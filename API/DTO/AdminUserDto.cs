using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class AdminUserDto
{
    [Required]
    public string Id { get; set; } = null!;

    public string? UserName { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public IList<string> Roles { get; set; } = new List<string>();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsLocked { get; set; }
}


