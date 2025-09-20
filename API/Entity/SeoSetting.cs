namespace API.Entity;

public class SeoSetting
{
    public int Id { get; set; }
    public string PageKey { get; set; } = null!; // home, about, contact, products, etc.
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Keywords { get; set; }
    public string? OgTitle { get; set; }
    public string? OgDescription { get; set; }
    public string? OgImage { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
