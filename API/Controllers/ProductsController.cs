using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")] // api/products ile eriselecektir.
public class ProductsController : ControllerBase
{
    private readonly DataContext _context;
    public ProductsController(DataContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _context.Products
            .Include(p => p.Category)
            .ToListAsync();
        return Ok(products);
    }

    // api/products/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int? id)
    {
        // var product = await _context.Products.FindAsync(id);
        if (id == null)
        {
            return NotFound();
        }

        var product = await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Reviews)
            .FirstOrDefaultAsync(i => i.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, Product updated)
    {
        if (id != updated.Id) return BadRequest();

        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        product.Name = updated.Name;
        product.Description = updated.Description;
        product.ImageUrl = updated.ImageUrl;
        product.Price = updated.Price;
        product.IsActive = updated.IsActive;
        product.Stock = updated.Stock;
        product.CategoryId = updated.CategoryId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}