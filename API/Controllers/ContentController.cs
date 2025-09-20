using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ContentController(DataContext context) : ControllerBase
{
    private readonly DataContext _context = context;

    [HttpGet("{key}")]
    public async Task<IActionResult> GetContent(string key)
    {
        var content = await _context.PageContents.FirstOrDefaultAsync(x => x.Key == key);
        if (content == null) return NotFound();
        return Ok(content);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{key}")]
    public async Task<IActionResult> UpsertContent(string key, [FromBody] PageContent body)
    {
        var content = await _context.PageContents.FirstOrDefaultAsync(x => x.Key == key);
        if (content == null)
        {
            var newContent = new PageContent { Key = key, Value = body.Value };
            _context.PageContents.Add(newContent);
            await _context.SaveChangesAsync();
            return Ok(newContent);
        }

        content.Value = body.Value;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}


