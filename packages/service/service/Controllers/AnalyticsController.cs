using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using service.Models;

namespace service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ApplicationPolicy")]
    public class AnalyticsController : ControllerBase
    {
        private readonly RwaContext _context;

        private static (
            Expression<Func<OrdersList, SalesGroupBy>> Key,
            Expression<Func<SalesGroupBy, IEnumerable<decimal>, Sales>> Values
            ) GroupByFns(string groupBy) => groupBy switch
            {
                "day" => (
                    i => new SalesGroupBy { ProductCategory = i.Product.ProductCategory, OrderDate = i.Order.OrderDate },
                    (key, g) => new Sales
                    {
                        Date = key.OrderDate.Value,
                        Category = key.ProductCategory,
                        Total = decimal.Round(g.Sum())
                    }
                ),
                _ => (
                    i => new SalesGroupBy { ProductCategory = i.Product.ProductCategory, Month = i.Order.OrderDate.Value.Month, Year = i.Order.OrderDate.Value.Year },
                    (key, g) => new Sales
                    {
                        Date = new DateTime(key.Year.Value, key.Month.Value, 1),
                        Category = key.ProductCategory,
                        Total = decimal.Round(g.Sum())
                    }
                )
            };
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
                .Select(g => new SalesOrOpportunitiesByCategory()
                {
                    Name = g.Key,
                    Value = decimal.Round(g.Sum(i => i.OrderItemTotal.Value))
                })
                .OrderBy(x => x.Name)
                .ToListAsync();
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
        // GET: api/Analytics/SalesByOrderDateAndCategory/month
        [HttpGet("SalesByOrderDate/{groupByPeriod}")]
        public async Task<IEnumerable<Sales>> GetSalesGroupedByOrderDateAndCategory(string groupByPeriod)
        {
            var (KeyFn, ValuesFn) = GroupByFns(groupByPeriod);
            var sales = await _context.OrdersLists
                .GroupBy(
                    KeyFn,
                    i => i.OrderItemTotal.Value,
                    ValuesFn
                    )
                .OrderBy(x => x.Category)
                .ToListAsync();
            return sales;
        }

        // GET: api/Analytics/Sales/21-02-01/21-03-01
        [HttpGet("Sales/{startDateStr}/{endDateStr}")]
        public async Task<IEnumerable<Sales>> GetSales(string startDateStr, string endDateStr)
        {
            var startDate = Convert.ToDateTime(startDateStr);
            var endDate = Convert.ToDateTime(endDateStr);

            var groupByMonth = (endDate - startDate).TotalDays > 31;
            Func<OrdersList, DateTime> keyFn = groupByMonth ?
                (i) => new DateTime(i.Order.OrderDate.Value.Year, i.Order.OrderDate.Value.Month, 1) :
                (i) => i.Order.OrderDate.Value;
            var sales = await _context.OrdersLists
                .Include(_ => _.Order)
                .Where(i => i.Order.OrderDate >= startDate)
                .Where(i => i.Order.OrderDate <= endDate)
                .ToListAsync();
            return sales
                .GroupBy(
                    keyFn,
                    (v) => v.OrderItemTotal.Value,
                    (key, v) => new Sales { Date = key, Total = v.Sum() }
                    );
        }

        // GET: api/Analytics/SalesByStateAndCity/21-02-01/21-03-01
        [HttpGet("SalesByStateAndCity/{startDate}/{endDate}")]
        public IEnumerable<SalesByState> GetSalesByStateAndCity(string startDate, string endDate)
        {
            var sales = _context.OrdersLists
                .Where(i => i.Order.OrderDate.Value >= Convert.ToDateTime(startDate))
                .Where(i => i.Order.OrderDate.Value <= Convert.ToDateTime(endDate))
                .Select(item => new
                {
                    State = _context.States.Where(state => _context.ManagerStoreLocations.Where(store => store.ManagerStoreId == item.Order.OrderManagerLocationId).FirstOrDefault().ManagerStoreState == state.SateId).FirstOrDefault().StateLong,
                    City = _context.ManagerStoreLocations.Where(store => store.ManagerStoreId == item.Order.OrderManagerLocationId).FirstOrDefault().ManagerStoreCity,
                    Total = item.OrderItemTotal.Value
                })
                .ToList()
                .GroupBy(
                    i => new { i.State, i.City },
                    i => i.Total,
                    (key, g) => new
                    {
                        key.State,
                        key.City,
                        Total = g.Sum()
                    });

            var sum = sales.Sum(s => s.Total);
            var statesMap = _context.States.ToLookup(k => k.StateLong);
            var salesWithPercentage = sales
                .Select(s => new SalesByState
                {
                    StateName = s.State,
                    StateCoords = statesMap[s.State].FirstOrDefault().StateCoords,
                    City = s.City,
                    Total = s.Total,
                    Percentage = (float)(s.Total / sum)
                });

            return salesWithPercentage;
        }
    }
}
