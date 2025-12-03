using API.Data;
using API.Entity;
using API.Middlewares;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
{
    var config = builder.Configuration;
    var connectionString = config.GetConnectionString("defaultConnection");

    options.UseSqlServer(connectionString);
});

// Register CORS service to allow cross-origin requests (configured later in the pipeline)
builder.Services.AddCors();


// Adds Identity services to the application for user authentication and role management.
// - `AppUser` represents the user entity (custom user model).
// - `AppRole` represents the role entity (custom role model).
// - `AddEntityFrameworkStores<DataContext>()` integrates Identity with Entity Framework Core, 
//   allowing Identity to use the `DataContext` database to store users and roles.
builder.Services.AddIdentity<AppUser, AppRole>().AddEntityFrameworkStores<DataContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireDigit = false;

    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
});

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidIssuer = "nurettinakpinar.com",
        ValidateAudience = false,
        ValidAudience = "nurettin",
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JWTSecurity:SecretKey"]!)),
        ValidateLifetime = true,
    };
});

// Add controllers to the application
// This enables API endpoints to handle HTTP requests (GET, POST, PUT, DELETE, etc.).
// Without this, the app won't recognize controllers and won't respond to API requests.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Prevent circular reference errors when serializing related entities
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<TokenService>();

var app = builder.Build();



app.UseMiddleware<ExceptionHandling>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Demo API");
    });
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// This allows the reach static files for others.
app.UseStaticFiles(); // normal static files

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")),
    RequestPath = "/api/images"
});

// CORS Configuration: 
// This allows requests from 'http://localhost:3000' (React frontend) to access this API.
// It permits any HTTP headers and any HTTP methods (GET, POST, PUT, DELETE, etc.).
// Make sure this origin matches the frontend running in development.
var allowedOrigins = new[]
{
    "http://localhost:3000",
    "http://10.20.88.194:3000"
};

app.UseCors(opt =>
{
    opt.WithOrigins(allowedOrigins)
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials();
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.Migrate();
    SeedDatabase.Initialize(app);
}

app.Run();
