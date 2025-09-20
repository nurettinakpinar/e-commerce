using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CategoryController(DataContext context) : ControllerBase
{
    private readonly DataContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Categories
            .Where(c => c.IsActive)
            .OrderBy(c => c.SortOrder)
            .ToListAsync();
        return Ok(categories);
    }

    [HttpGet("all")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _context.Categories
            .OrderBy(c => c.SortOrder)
            .ToListAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();
        return Ok(category);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateCategory(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, Category updated)
    {
        if (id != updated.Id) return BadRequest();

        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();

        category.Name = updated.Name;
        category.Description = updated.Description;
        category.ImageUrl = updated.ImageUrl;
        category.IsActive = updated.IsActive;
        category.SortOrder = updated.SortOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();
        
        // Check if category has products
        var hasProducts = await _context.Products.AnyAsync(p => p.CategoryId == id);
        if (hasProducts)
        {
            return BadRequest(new { message = "Bu kategoriye ait ürünler bulunmaktadır. Önce ürünleri başka kategoriye taşıyın." });
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
