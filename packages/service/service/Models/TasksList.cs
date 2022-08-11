using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class TasksList
    {
        public int Id { get; set; }
        public int? ContactId { get; set; }
        public int? ManagerId { get; set; }
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int? TaskId { get; set; }
        public int? Progress { get; set; }

        public virtual Contact? Contact { get; set; }
        public virtual Manager? Manager { get; set; }
        public virtual Task? Task { get; set; }
    }
}
