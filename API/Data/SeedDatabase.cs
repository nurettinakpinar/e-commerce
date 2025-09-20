using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class SeedDatabase
{
    public static async void Initialize(IApplicationBuilder app)
    {
        var userManager = app.ApplicationServices
                            .CreateScope()
                            .ServiceProvider
                            .GetRequiredService<UserManager<AppUser>>();

        var roleManager = app.ApplicationServices
                            .CreateScope()
                            .ServiceProvider
                            .GetRequiredService<RoleManager<AppRole>>();

        if (!await roleManager.RoleExistsAsync("Customer"))
        {
            await roleManager.CreateAsync(new AppRole { Name = "Customer" });
        }
        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new AppRole { Name = "Admin" });
        }

        var existingAdmin = await userManager.FindByNameAsync("admin");
        if (existingAdmin == null)
        {
            var Admin = new AppUser { Name = "admin", UserName = "admin", Email = "admin@hotmail.com" };
            await userManager.CreateAsync(Admin, "Admin123.");
            await userManager.AddToRoleAsync(Admin, "Admin");
        }

        var existingCustomer = await userManager.FindByNameAsync("nurettinakpinar");
        if (existingCustomer == null)
        {
            var Customer = new AppUser { Name = "nurettin akpinar", UserName = "nurettinakpinar", Email = "nurettinakpinar1@hotmail.com" };
            await userManager.CreateAsync(Customer, "Customer123.");
            await userManager.AddToRoleAsync(Customer, "Customer");
        }
    }
}