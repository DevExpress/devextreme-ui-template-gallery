using System;
using System.Collections.Generic;

namespace service.Models
{
    public class Sales
    { 
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public decimal Total { get; set; }
    }

    public class SalesOrOpportunitiesByCategory
    {
        public string Name { get; set; }
        public decimal? Value { get; set; }
    }

    public class SalesByState
    {
        public string StateName { get; set; }
        public string StateCoords { get; set; }
        public string City { get; set; }
        public decimal Total { get; set; }
        public float Percentage { get; set; }
    }
}
