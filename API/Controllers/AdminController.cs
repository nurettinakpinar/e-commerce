using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/admin")] 
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    public AdminController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("users")]
    public async Task<ActionResult<List<AdminUserDto>>> GetUsers()
    {
        var users = _userManager.Users.ToList();

        var result = new List<AdminUserDto>();
        foreach (var u in users)
        {
            var roles = await _userManager.GetRolesAsync(u);
            result.Add(new AdminUserDto
            {
                Id = u.Id,
                UserName = u.UserName,
                Name = u.Name ?? u.UserName,
                Email = u.Email,
                Roles = roles.ToList(),
                CreatedAt = DateTime.UtcNow,
                IsLocked = u.LockoutEnd.HasValue && u.LockoutEnd.Value > DateTimeOffset.UtcNow
            });
        }

        return Ok(result.OrderBy(r => r.Name).ToList());
    }

    public class UpdateRolesRequest
    {
        public IList<string> Roles { get; set; } = new List<string>();
    }

    [HttpPut("users/{id}/roles")]
    public async Task<ActionResult> UpdateUserRoles(string id, UpdateRolesRequest req)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        var current = await _userManager.GetRolesAsync(user);
        var remove = current.Where(r => !req.Roles.Contains(r)).ToList();
        var add = req.Roles.Where(r => !current.Contains(r)).ToList();

        if (remove.Count > 0)
        {
            var res = await _userManager.RemoveFromRolesAsync(user, remove);
            if (!res.Succeeded) return BadRequest(res.Errors);
        }
        if (add.Count > 0)
        {
            var res = await _userManager.AddToRolesAsync(user, add);
            if (!res.Succeeded) return BadRequest(res.Errors);
        }

        return NoContent();
    }

    [HttpPost("users/{id}/block")]
    public async Task<ActionResult> BlockUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        // lock for 100 years
        user.LockoutEnabled = true;
        user.LockoutEnd = DateTimeOffset.UtcNow.AddYears(100);
        var res = await _userManager.UpdateAsync(user);
        if (!res.Succeeded) return BadRequest(res.Errors);
        return NoContent();
    }

    [HttpPost("users/{id}/unblock")]
    public async Task<ActionResult> UnblockUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        user.LockoutEnd = null;
        user.LockoutEnabled = false;
        var res = await _userManager.UpdateAsync(user);
        if (!res.Succeeded) return BadRequest(res.Errors);
        return NoContent();
    }
}


