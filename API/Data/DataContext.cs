using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser, AppRole, string>(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>() {
                 new Product()
                    {
                        Id = 1,
                        Name = "Iphone 11",
                        Description = "Telefon 1",
                        ImageUrl = "1.jpg",
                        Price = 20000,
                        IsActive = true,
                        Stock = 1
                    },
                    new Product()
                    {
                        Id = 2,
                        Name = "Iphone 12",
                        Description = "Telefon 1",
                        ImageUrl = "2.jpg",
                        Price = 21000,
                        IsActive = true,
                        Stock = 1
                    },
                    new Product()
                    {
                        Id = 3,
                        Name = "Iphone 13",
                        Description = "Telefon 1",
                        ImageUrl = "3.jpg",
                        Price = 22000,
                        IsActive = true,
                        Stock = 1
                    },
                     new Product()
                    {
                        Id = 4,
                        Name = "Iphone 14",
                        Description = "Telefon 1",
                        ImageUrl = "4.jpg",
                        Price = 23000,
                        IsActive = true,
                        Stock = 1
                    }
            }
        );
    }
}