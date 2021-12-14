using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class ProductsOpportunitiesList
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int? OpportunityListId { get; set; }

        public virtual OpportunitiesList OpportunityList { get; set; }
        public virtual Product Product { get; set; }
    }
}
