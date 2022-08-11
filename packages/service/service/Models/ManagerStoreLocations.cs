using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace service.Models
{
    public partial class ManagerStoreLocations
    {
        [Key]
        public int ManagerStoreId { get; set; }

        public int? ManagerId { get; set; }
        public string ManagerStoreCity { get; set; }
        public int? ManagerStoreState { get; set; }

        public virtual Manager Manager { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
