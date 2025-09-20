using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class SeoController(DataContext context) : ControllerBase
{
    private readonly DataContext _context = context;

    [HttpGet("{pageKey}")]
    public async Task<IActionResult> GetSeoSettings(string pageKey)
    {
        var seoSettings = await _context.SeoSettings
            .FirstOrDefaultAsync(s => s.PageKey == pageKey);
        
        if (seoSettings == null)
        {
            // Return default SEO settings
            return Ok(new SeoSetting
            {
                PageKey = pageKey,
                Title = "GUL&RA Kuyumcu",
                Description = "Premium mücevher ve kuyumculuk hizmetleri",
                Keywords = "kuyumcu, mücevher, altın, gümüş"
            });
        }
        
        return Ok(seoSettings);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAllSeoSettings()
    {
        var seoSettings = await _context.SeoSettings
            .OrderBy(s => s.PageKey)
            .ToListAsync();
        return Ok(seoSettings);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{pageKey}")]
    public async Task<IActionResult> UpdateSeoSettings(string pageKey, SeoSetting updated)
    {
        var seoSettings = await _context.SeoSettings
            .FirstOrDefaultAsync(s => s.PageKey == pageKey);

        if (seoSettings == null)
        {
            // Create new SEO settings
            var newSeoSettings = new SeoSetting
            {
                PageKey = pageKey,
                Title = updated.Title,
                Description = updated.Description,
                Keywords = updated.Keywords,
                OgTitle = updated.OgTitle,
                OgDescription = updated.OgDescription,
                OgImage = updated.OgImage,
                UpdatedAt = DateTime.UtcNow
            };
            
            _context.SeoSettings.Add(newSeoSettings);
            await _context.SaveChangesAsync();
            return Ok(newSeoSettings);
        }

        // Update existing SEO settings
        seoSettings.Title = updated.Title;
        seoSettings.Description = updated.Description;
        seoSettings.Keywords = updated.Keywords;
        seoSettings.OgTitle = updated.OgTitle;
        seoSettings.OgDescription = updated.OgDescription;
        seoSettings.OgImage = updated.OgImage;
        seoSettings.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{pageKey}")]
    public async Task<IActionResult> DeleteSeoSettings(string pageKey)
    {
        var seoSettings = await _context.SeoSettings
            .FirstOrDefaultAsync(s => s.PageKey == pageKey);
        
        if (seoSettings == null) return NotFound();

        _context.SeoSettings.Remove(seoSettings);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
