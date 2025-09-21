using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using static API.Entity.Order;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public OrderController(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet("GetOrders")]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDTO() //TODO: Search Automapper 
                        .Where(i => i.CustomerId == User.Identity!.Name)
                        .ToListAsync();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin/all")]
        public async Task<ActionResult<List<OrderDTO>>> GetAllOrders()
        {
            return await _context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDTO()
                        .OrderByDescending(o => o.OrderDate)
                        .ToListAsync();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("admin/{id}/status")]
        public async Task<ActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto statusDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            order.OrderStatus = (OrderStatus)statusDto.Status;
            
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            
            return BadRequest(new ProblemDetails { Title = "Problem updating order status" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("admin/{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);
                
            if (order == null) return NotFound();

            // Restore stock
            foreach (var item in order.OrderItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product != null)
                {
                    product.Stock += item.Quantity;
                }
            }

            _context.Orders.Remove(order);
            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return NoContent();
            return BadRequest(new ProblemDetails { Title = "Problem deleting order" });
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO?>> GetOrder(int id)
        {
            return await _context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDTO() //TODO: Search Automapper  
                        .Where(i => i.CustomerId == User.Identity!.Name && i.Id == id)
                        .FirstOrDefaultAsync();
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var cart = await _context.Carts
                        .Include(i => i.CartItems)
                        .ThenInclude(i => i.Product)
                        .Where(i => i.CustomerId == User.Identity!.Name)
                        .FirstOrDefaultAsync();

            if (cart == null)
            {
                return BadRequest(new ProblemDetails { Title = "Problem getting Cart" });
            }

            var OrderitemsList = new List<Entity.OrderItem>();

            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                var orderItem = new Entity.OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImg = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                OrderitemsList.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subTotal = OrderitemsList.Sum(i => i.Price * i.Quantity);
            var deliveryFee = 0;

            var order = new Order
            {
                OrderItems = OrderitemsList,
                CustomerId = User.Identity!.Name,
                FirstName = orderDTO.FirstName,
                LastName = orderDTO.LastName,
                Phone = orderDTO.Phone,
                City = orderDTO.City,
                AddressLine = orderDTO.AddressLine,
                SubTotal = subTotal,
                DeliveryFee = deliveryFee
            };

            var paymentResult = await ProcessPayment(orderDTO, cart);

            if (paymentResult.Status == "failure")
            {
                return BadRequest(new ProblemDetails { Title = paymentResult.ErrorMessage });
            }

            order.ConversationId = paymentResult.ConversationId;
            order.BasketId = paymentResult.BasketId;

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtRoute(nameof(GetOrder), new { id = order.Id }, order.Id);
            }

            return BadRequest(new ProblemDetails { Title = "problem getting order" });

        }

        private async Task<Payment> ProcessPayment(CreateOrderDTO model, Cart cart)
        {
            Options options = new Options();
            options.ApiKey = _config["PaymentAPI:APIKey"];
            options.SecretKey = _config["PaymentAPI:SecretKey"];
            options.BaseUrl = "https://sandbox-api.iyzipay.com";

            CreatePaymentRequest request = new CreatePaymentRequest();
            request.Locale = Locale.TR.ToString();
            request.ConversationId = Guid.NewGuid().ToString();
            request.Price = cart.calculateTotal().ToString();
            request.PaidPrice = cart.calculateTotal().ToString();
            request.Currency = Currency.TRY.ToString();
            request.Installment = 1;
            request.BasketId = cart.CartId.ToString();
            request.PaymentChannel = PaymentChannel.WEB.ToString();
            request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

            PaymentCard paymentCard = new PaymentCard();
            paymentCard.CardHolderName = model.CardName;
            paymentCard.CardNumber = model.CardNumber;
            paymentCard.ExpireMonth = model.CardExpireMonth;
            paymentCard.ExpireYear = model.CardExpireYear;
            paymentCard.Cvc = model.CardCvc;
            paymentCard.RegisterCard = 0;
            request.PaymentCard = paymentCard;

            Buyer buyer = new Buyer();
            buyer.Id = "BY789";
            buyer.Name = model.FirstName;
            buyer.Surname = model.LastName;
            buyer.GsmNumber = model.Phone;
            buyer.Email = "email@email.com";
            buyer.IdentityNumber = "74300864791";
            buyer.LastLoginDate = "2015-10-05 12:43:35";
            buyer.RegistrationDate = "2013-04-21 15:12:09";
            buyer.RegistrationAddress = model.AddressLine;
            buyer.Ip = "85.34.78.112";
            buyer.City = model.City;
            buyer.Country = "Turkiye";
            buyer.ZipCode = "34732";
            request.Buyer = buyer;

            Address shippingAddress = new Address();
            shippingAddress.ContactName = model.FirstName + model.LastName;
            shippingAddress.City = model.City;
            shippingAddress.Country = "Türkiye";
            shippingAddress.Description = model.AddressLine;
            shippingAddress.ZipCode = "34742";

            request.ShippingAddress = shippingAddress;
            request.BillingAddress = shippingAddress;

            List<BasketItem> basketItems = new List<BasketItem>();

            foreach (var item in cart.CartItems)
            {
                BasketItem BasketItem = new BasketItem();
                BasketItem.Id = item.ProductId.ToString();
                BasketItem.Name = item.Product.Name;
                BasketItem.Category1 = "telefon";
                BasketItem.ItemType = BasketItemType.PHYSICAL.ToString();
                BasketItem.Price = ((double)item.Product.Price * item.Quantity).ToString();
                basketItems.Add(BasketItem);
            }

            request.BasketItems = basketItems;

            return await Payment.Create(request, options);
        }
    }
}