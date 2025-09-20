using System.ComponentModel.DataAnnotations;

namespace API.Entity;

public class Review
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    [Required]
    public string UserId { get; set; } = null!;
    public AppUser User { get; set; } = null!;

    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }

    [Required]
    [MaxLength(1000)]
    public string Comment { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [MaxLength(100)]
    public string UserName { get; set; } = null!;
}
