using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Order
    {
        public Order()
        {
            OrdersLists = new HashSet<OrdersList>();
        }

        public int OrderId { get; set; }
        public int? OrderManagerLocationId { get; set; }
        public int? OrderManagerId { get; set; }
        public DateTime? OrderDate { get; set; }

        public virtual ManagerStoreLocations ManagerStoreLocations { get; set; }
        public virtual Manager Manager { get; set; }
        public virtual ICollection<OrdersList> OrdersLists { get; set; }
    }
}
