using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class OpportunitiesList
    {
        public OpportunitiesList()
        {
            ProductsOpportunitiesLists = new HashSet<ProductsOpportunitiesList>();
        }

        public int Id { get; set; }
        public int ContactId { get; set; }
        public int ManagerId { get; set; }
        public int OpportunityId { get; set; }
        public int Active { get; set; }

        public virtual Contact Contact { get; set; }
        public virtual Manager Manager { get; set; }
        public virtual Opportunity Opportunity { get; set; }
        public virtual ICollection<ProductsOpportunitiesList> ProductsOpportunitiesLists { get; set; }
    }
}
