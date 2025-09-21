using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class UpdateOrderStatusDto
{
    [Required]
    public int Status { get; set; }
}
