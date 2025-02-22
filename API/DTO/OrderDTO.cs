namespace API.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string FirstName { get; set; }= null!;
        public string LastName { get; set; }= null!;
        public string Phone { get; set; }= null!;
        public string City { get; set; }= null!;
        public string AddressLine { get; set; }= null!;
        public string CustomerId { get; set; }= null!;
        public Entity.OrderStatus OrderStatus { get; set; } = Entity.OrderStatus.Pending;
        public List<OrderItemDTO> OrderItems { get; set; } = new();
        public decimal SubTotal { get; set; }
        public decimal DeliveryFee { get; set; }
 
    }

    public class OrderItemDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public string ProductImg { get; set; } = null!;
        public Decimal Price { get; set; }
        public int Quantity { get; set; }
    }

}