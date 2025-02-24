using System.ComponentModel.DataAnnotations;

namespace API.Entity;

public class Product
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Decimal Price { get; set; }
    public Boolean IsActive { get; set; }
    public string? ImageUrl { get; set; }
    public int Stock { get; set; }
}