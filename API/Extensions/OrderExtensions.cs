using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> OrderToDTO(this IQueryable<Order> query)
        {
            return query.Select(i => new OrderDTO
            {
                Id = i.Id,
                CustomerId = i.CustomerId,
                FirstName = i.FirstName,
                LastName = i.LastName,
                Phone = i.Phone,
                AddressLine = i.AddressLine,
                City = i.City,
                DeliveryFee = i.DeliveryFree,
                SubTotal = i.SubTotal,
                OrderDate = i.OrderDate,
                OrderStatus = i.OrderStatus,
                OrderItems = i.OrderItems.Select(k => new OrderItemDTO
                {
                    Id = k.Id,
                    ProductName = k.ProductName,
                    ProductId = k.ProductId,
                    ProductImg = k.ProductImg,
                    Price = k.Price,
                    Quantity = k.Quantity,
                }).ToList(),
            });
        }
    }
}