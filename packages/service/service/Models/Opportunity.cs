using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Opportunity
    {
        public Opportunity()
        {
            OpportunitiesLists = new HashSet<OpportunitiesList>();
        }

        public int Id { get; set; }
        public string? Opportunity1 { get; set; }

        public virtual ICollection<OpportunitiesList> OpportunitiesLists { get; set; }
    }
}
