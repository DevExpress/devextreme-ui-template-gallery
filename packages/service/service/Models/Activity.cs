using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Activity
    {
        public Activity()
        {
            ActivitiesLists = new HashSet<ActivitiesList>();
        }

        public int Id { get; set; }
        public string Activity1 { get; set; }

        public virtual ICollection<ActivitiesList> ActivitiesLists { get; set; }
    }
}
