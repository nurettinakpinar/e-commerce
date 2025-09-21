using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ReviewController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<AppUser> _userManager;

    public ReviewController(DataContext context, UserManager<AppUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet("product/{productId}")]
    public async Task<ActionResult<List<Review>>> GetProductReviews(int productId)
    {
        var reviews = await _context.Reviews
            .Where(r => r.ProductId == productId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
        
        return Ok(reviews);
    }

    [HttpGet("product/{productId}/stats")]
    public async Task<ActionResult<object>> GetProductReviewStats(int productId)
    {
        var reviews = await _context.Reviews
            .Where(r => r.ProductId == productId)
            .ToListAsync();

        if (!reviews.Any())
        {
            return Ok(new { averageRating = 0.0, totalReviews = 0 });
        }

        var averageRating = reviews.Average(r => r.Rating);
        var totalReviews = reviews.Count;

        return Ok(new { averageRating = Math.Round(averageRating, 1), totalReviews });
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Review>> CreateReview(CreateReviewDto createReviewDto)
    {
        // Get current user
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        // Check if user already reviewed this product
        var existingReview = await _context.Reviews
            .FirstOrDefaultAsync(r => r.ProductId == createReviewDto.ProductId && r.UserId == user.Id);
        
        if (existingReview != null)
        {
            return BadRequest(new ProblemDetails { Title = "Bu ürün için zaten bir değerlendirme yapmışsınız." });
        }

        // Check if product exists
        var product = await _context.Products.FindAsync(createReviewDto.ProductId);
        if (product == null) return NotFound("Ürün bulunamadı.");

        var review = new Review
        {
            ProductId = createReviewDto.ProductId,
            Rating = createReviewDto.Rating,
            Comment = createReviewDto.Comment,
            UserId = user.Id,
            UserName = user.Name ?? user.UserName!,
            CreatedAt = DateTime.UtcNow
        };

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProductReviews), new { productId = review.ProductId }, review);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateReview(int id, Review updatedReview)
    {
        if (id != updatedReview.Id) return BadRequest();

        var review = await _context.Reviews.FindAsync(id);
        if (review == null) return NotFound();

        // Get current user
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        // Check if user owns this review or is admin
        var userRoles = await _userManager.GetRolesAsync(user);
        if (review.UserId != user.Id && !userRoles.Contains("Admin"))
        {
            return Forbid();
        }

        review.Rating = updatedReview.Rating;
        review.Comment = updatedReview.Comment;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteReview(int id)
    {
        var review = await _context.Reviews.FindAsync(id);
        if (review == null) return NotFound();

        // Get current user
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        // Check if user owns this review or is admin
        var userRoles = await _userManager.GetRolesAsync(user);
        if (review.UserId != user.Id && !userRoles.Contains("Admin"))
        {
            return Forbid();
        }

        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
