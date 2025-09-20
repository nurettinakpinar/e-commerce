using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser, AppRole, string>(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<PageContent> PageContents => Set<PageContent>();
    public DbSet<SeoSetting> SeoSettings => Set<SeoSetting>();
    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.ConfigureWarnings(warnings => 
            warnings.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>() {
                 new Product()
                    {
                        Id = 1,
                        Name = "Elmas Yüzük",
                        Description = "18 ayar altın üzerine işlenmiş 0.5 karat elmas yüzük. El işçiliği ile özenle hazırlanmış özel tasarım.",
                        ImageUrl = "1.jpg",
                        Price = 25000,
                        IsActive = true,
                        Stock = 5
                    },
                    new Product()
                    {
                        Id = 2,
                        Name = "Altın Kolye",
                        Description = "22 ayar altından üretilmiş zarif kolye. Günlük kullanım için ideal, şık ve modern tasarım.",
                        ImageUrl = "2.jpg",
                        Price = 15000,
                        IsActive = true,
                        Stock = 8
                    },
                    new Product()
                    {
                        Id = 3,
                        Name = "Platin Küpe",
                        Description = "Platin üzerine işlenmiş inci detaylı küpe. Özel günler için mükemmel seçim.",
                        ImageUrl = "3.jpg",
                        Price = 8500,
                        IsActive = true,
                        Stock = 12
                    },
                     new Product()
                    {
                        Id = 4,
                        Name = "Gümüş Bilezik",
                        Description = "925 ayar gümüşten üretilmiş örgü desenli bilezik. Her yaşa uygun zarif tasarım.",
                        ImageUrl = "4.jpg",
                        Price = 3500,
                        IsActive = true,
                        Stock = 15
                    },
                     new Product()
                    {
                        Id = 5,
                        Name = "Pırlanta Broş",
                        Description = "Vintage tarzda pırlanta işlemeli broş. Koleksiyonculara özel nadir parça.",
                        ImageUrl = "5.jpg",
                        Price = 45000,
                        IsActive = true,
                        Stock = 2
                    }
            }
        );

        modelBuilder.Entity<PageContent>().HasData(
            new List<PageContent>()
            {
                new PageContent
                {
                    Id = 1,
                    Key = "about",
                    Value = "GUL&RA kuyumculuk hakkında içerik buraya gelecek."
                },
                new PageContent
                {
                    Id = 2,
                    Key = "contact",
                    Value = "Adres ve iletişim bilgileri burada yönetilebilir."
                }
            }
        );

        // Categories seed data
        modelBuilder.Entity<Category>().HasData(
            new List<Category>()
            {
                new Category { Id = 1, Name = "Yüzükler", Description = "Altın ve gümüş yüzük koleksiyonu", IsActive = true, SortOrder = 1 },
                new Category { Id = 2, Name = "Kolyeler", Description = "Zarif kolye modelleri", IsActive = true, SortOrder = 2 },
                new Category { Id = 3, Name = "Küpeler", Description = "Şık küpe çeşitleri", IsActive = true, SortOrder = 3 },
                new Category { Id = 4, Name = "Bilezikler", Description = "El işçiliği bilezikler", IsActive = true, SortOrder = 4 },
                new Category { Id = 5, Name = "Broşlar", Description = "Vintage broş koleksiyonu", IsActive = true, SortOrder = 5 }
            }
        );

        // SEO Settings seed data
        modelBuilder.Entity<SeoSetting>().HasData(
            new List<SeoSetting>()
            {
                new SeoSetting
                {
                    Id = 1,
                    PageKey = "home",
                    Title = "GUL&RA Kuyumcu - Premium Mücevher ve Kuyumculuk",
                    Description = "30 yıllık deneyimimizle en kaliteli mücevherler. Altın, gümüş, pırlanta ve değerli taş koleksiyonları.",
                    Keywords = "kuyumcu, mücevher, altın, gümüş, pırlanta, yüzük, kolye, küpe"
                },
                new SeoSetting
                {
                    Id = 2,
                    PageKey = "about",
                    Title = "Hakkımızda - GUL&RA Kuyumcu",
                    Description = "1994'ten beri mücevher sanatının en ince detaylarını işleyen köklü aile şirketi.",
                    Keywords = "hakkımızda, kuyumcu tarihi, deneyim, kalite"
                },
                new SeoSetting
                {
                    Id = 3,
                    PageKey = "contact",
                    Title = "İletişim - GUL&RA Kuyumcu",
                    Description = "Mücevher ihtiyaçlarınız için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaya hazır.",
                    Keywords = "iletişim, adres, telefon, randevu"
                },
                new SeoSetting
                {
                    Id = 4,
                    PageKey = "products",
                    Title = "Ürünlerimiz - GUL&RA Kuyumcu",
                    Description = "Özenle seçilmiş mücevher koleksiyonumuz. Yüzük, kolye, küpe ve daha fazlası.",
                    Keywords = "ürünler, mücevher koleksiyonu, katalog"
                }
            }
        );
    }
}