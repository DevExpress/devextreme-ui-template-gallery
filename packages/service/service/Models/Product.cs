using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace service.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductsOpportunitiesLists = new HashSet<ProductsOpportunitiesList>();
            OrdersLists = new HashSet<OrdersList>();
            QuotesLists = new HashSet<QuotesList>();
        }

        [Key]
        public int ProductId { get; set; }

        public string? ProductName { get; set; }
        public string? ProductCategory { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductCost { get; set; }
        public decimal? ProductSalePrice { get; set; }
        public decimal? ProductRetailPrice { get; set; }

        public virtual ICollection<ProductsOpportunitiesList> ProductsOpportunitiesLists { get; set; }
        public virtual ICollection<OrdersList> OrdersLists { get; set; }
        public virtual ICollection<QuotesList> QuotesLists { get; set; }
    }
}
