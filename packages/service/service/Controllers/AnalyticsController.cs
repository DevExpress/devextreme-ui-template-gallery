using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using service.Models;

namespace service.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ApplicationPolicy")]
    public class AnalyticsController : ControllerBase
    {
        private readonly RwaContext _context;

        public AnalyticsController(RwaContext context)
        {
            _context = context;
        }

        // GET: api/Analytics/SalesByCategory/21-02-01/21-03-01
        [HttpGet("SalesByCategory/{startDate}/{endDate}")]
        public async Task<IEnumerable<SalesOrOpportunitiesByCategory>> GetSalesDataByCategory(string startDate, string endDate)
        {
            return await _context.OrdersLists
                .Where(i => i.Order.OrderDate.Value >= Convert.ToDateTime(startDate))
                .Where(i => i.Order.OrderDate.Value <= Convert.ToDateTime(endDate))
                .GroupBy(i => i.Product.ProductCategory)
                .Select(g => new SalesOrOpportunitiesByCategory() { 
                    Name = g.Key,
                    Value = Decimal.Round(g.Sum(i => i.OrderItemTotal.Value)) 
                }).ToListAsync();
        }

        // GET: api/Analytics/OpportunitiesByCategory/21-02-01/21-03-01
        [HttpGet("OpportunitiesByCategory/{startDate}/{endDate}")]
        public IEnumerable<SalesOrOpportunitiesByCategory> GetOpportunitiesByCategory(string startDate, string endDate)
        {
            var quotes = _context.Quotes
                .Where(i => i.QuoteDate.Value >= Convert.ToDateTime(startDate))
                .Where(i => i.QuoteDate.Value <= Convert.ToDateTime(endDate))
                .ToList();


            return new List<SalesOrOpportunitiesByCategory>() {
                new SalesOrOpportunitiesByCategory() { Name = "Sales",        Value = quotes.Where(q => q.QuoteOpportunity > 0.6).Sum(q => q.QuoteTotal) },
                new SalesOrOpportunitiesByCategory() { Name = "Quotes",      Value = quotes.Where(q => q.QuoteOpportunity > 0.3 && q.QuoteOpportunity < 0.6).Sum(q => q.QuoteTotal) },
                new SalesOrOpportunitiesByCategory() { Name = "Opportunities",         Value = quotes.Where(q => q.QuoteOpportunity > 0.12 && q.QuoteOpportunity < 0.3).Sum(q => q.QuoteTotal) },
                new SalesOrOpportunitiesByCategory() { Name = "Leads",    Value = quotes.Where(q => q.QuoteOpportunity < 0.12).Sum(q => q.QuoteTotal) }
            };
        }

        // GET: api/Analytics/Sales/21-02-01/21-03-01
        [HttpGet("Sales/{startDate}/{endDate}")]
        public IEnumerable GetSales(string startDate, string endDate)
        {
            var sales = _context.OrdersLists
                .Where(i => i.Order.OrderDate.Value >= Convert.ToDateTime(startDate))
                .Where(i => i.Order.OrderDate.Value <= Convert.ToDateTime(endDate))
                .GroupBy(
                    i => new { i.Product.ProductCategory, i.Order.OrderDate },
                    i => i.OrderItemTotal.Value,
                    (key, g) => new Sales {
                        Date = Convert.ToDateTime(key.OrderDate),
                        Category = key.ProductCategory,
                        Total = Decimal.Round(g.Sum())
                }).ToList();

            return sales;
        }

        // GET: api/Analytics/SalesByStateAndCity/21-02-01/21-03-01
        [HttpGet("SalesByStateAndCity/{startDate}/{endDate}")]
        public IEnumerable GetSalesByStateAndCity(string startDate, string endDate)
        {
            var sales = _context.OrdersLists
                .Where(i => i.Order.OrderDate.Value >= Convert.ToDateTime(startDate))
                .Where(i => i.Order.OrderDate.Value <= Convert.ToDateTime(endDate))
                .Select(item => new {
                    State = _context.States.Where(state => _context.ManagerStoreLocations.Where(store => store.ManagerStoreId == item.Order.OrderManagerLocationId).FirstOrDefault().ManagerStoreState == state.SateId).FirstOrDefault().StateLong,
                    City = _context.ManagerStoreLocations.Where(store => store.ManagerStoreId == item.Order.OrderManagerLocationId).FirstOrDefault().ManagerStoreCity,
                    Total = item.OrderItemTotal.Value
                }).ToList().GroupBy(
                    i => new { i.State, i.City },
                    i => i.Total,
                    (key, g) => new {
                        State = key.State,
                        City = key.City,
                        Total = g.Sum()
                }).ToList();

            var sum = (decimal)sales.Select(s => s.Total).Sum();
            var salesWithPercentage = sales.Select(s => new SalesByState
            {
                StateName = s.State,
                StateCoords = _context.States.Where(state => state.StateLong == s.State).FirstOrDefault().StateCoords,
                City = s.City,
                Total = s.Total,
                Percentage = (float)(s.Total / sum)
            }).ToList();

            return salesWithPercentage;
        }
    }
}
