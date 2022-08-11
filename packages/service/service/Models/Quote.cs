using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace service.Models
{
    public partial class Quote
    {
        public Quote()
        {
            QuotesLists = new HashSet<QuotesList>();
        }

        public int QuoteId { get; set; }
        public DateTime? QuoteDate { get; set; }
        public decimal? QuoteTotal { get; set; }
        public float? QuoteOpportunity { get; set; }

        public virtual ICollection<QuotesList> QuotesLists { get; set; }
    }
}
