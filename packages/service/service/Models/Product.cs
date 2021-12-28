using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductsOpportunitiesLists = new HashSet<ProductsOpportunitiesList>();
        }

        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductCost { get; set; }
        public decimal? ProductSalePrice { get; set; }
        public decimal? ProductRetailPrice { get; set; }

        public virtual ICollection<ProductsOpportunitiesList> ProductsOpportunitiesLists { get; set; }
    }
}
