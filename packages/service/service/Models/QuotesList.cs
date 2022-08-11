using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace service.Models
{
    public partial class QuotesList
    {
        [Key]
        public int QuoteItemId { get; set; }

        public int? QuoteId { get; set; }
        public int? QuoteItemProductId { get; set; }
        public decimal? QuoteItemTotal { get; set; }

        public virtual Product Product { get; set; }
        public virtual Quote Quote { get; set; }
    }
}
