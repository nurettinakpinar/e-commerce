using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult NotFoundError()
    {
        return NotFound(); //404
    }

    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest(); //400
    }

    [HttpGet("unauthorized")]
    public IActionResult UnAuhorizedError()
    {
        return Unauthorized(); //401
    }

    [HttpGet("validation-error")]
    public IActionResult ValidationError()
    {
        ModelState.AddModelError("Validation Error 1", "validation Error Details");
        ModelState.AddModelError("Validation Error 2", "validation Error Details");
        return ValidationProblem();
    }


    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("Server Error"); //500
    }
}