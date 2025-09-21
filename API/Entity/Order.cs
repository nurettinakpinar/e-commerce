using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? City { get; set; }
        public string? AddressLine { get; set; }
        public string? CustomerId { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public List<OrderItem> OrderItems { get; set; } = new();
        public decimal SubTotal { get; set; }
        public decimal DeliveryFee { get; set; }  
        public string? ConversationId { get; set; }
        public string? BasketId { get; set; }
        public decimal GetTotal()
        {
            return SubTotal + DeliveryFee;
        }
    }

    public class OrderItem
    {
        public int Id { get; set; }
        public int orderId { get; set; }
        public Order Order { get; set; } = null!;
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public string ProductName { get; set; } = null!;
        public string ProductImg { get; set; } = null!;
        public Decimal Price { get; set; }
        public int Quantity { get; set; }
    }


    public enum OrderStatus
    {
        Pending = 0,    // Beklemede
        Shipped = 1,    // Kargoda  
        Delivered = 2,  // Teslim Edildi
        Cancelled = 3   // İptal
    }
}