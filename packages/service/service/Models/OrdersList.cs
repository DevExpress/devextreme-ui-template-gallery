using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace service.Models
{
    public partial class OrdersList
    {
        [Key]
        public int OrderItemId { get; set; }

        public int? OrderId { get; set; }
        public int? OrderItemProductId { get; set; }
        public decimal? OrderItemTotal { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
