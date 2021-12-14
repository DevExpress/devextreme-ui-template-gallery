using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class ActivitiesList
    {
        public int Id { get; set; }
        public int ContactId { get; set; }
        public int ManagerId { get; set; }
        public int ActivityId { get; set; }
        public DateTime Date { get; set; }

        public virtual Activity Activity { get; set; }
        public virtual Contact Contact { get; set; }
        public virtual Manager Manager { get; set; }
    }
}
