using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>{
    var config = builder.Configuration;
    var connectionString = config.GetConnectionString("defaultConnection");

    options.UseSqlite(connectionString);
});

// Register CORS service to allow cross-origin requests (configured later in the pipeline)
builder.Services.AddCors();

// Add controllers to the application
// This enables API endpoints to handle HTTP requests (GET, POST, PUT, DELETE, etc.).
// Without this, the app won't recognize controllers and won't respond to API requests.
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI( options => {
        options.SwaggerEndpoint("/openapi/v1.json", "Demo API");
    });
}


app.UseHttpsRedirection();

// This allows the reach static files for others.
app.UseStaticFiles();

// CORS Configuration: 
// This allows requests from 'http://localhost:3000' (React frontend) to access this API.
// It permits any HTTP headers and any HTTP methods (GET, POST, PUT, DELETE, etc.).
// Make sure this origin matches the frontend running in development.
app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});


app.UseAuthorization();

app.MapControllers();

app.Run();
