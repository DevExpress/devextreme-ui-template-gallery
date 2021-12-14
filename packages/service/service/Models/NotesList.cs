using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class NotesList
    {
        public int Id { get; set; }
        public int? ContactId { get; set; }
        public int? ManagerId { get; set; }
        public int? NoteId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Contact Contact { get; set; }
        public virtual Manager Manager { get; set; }
        public virtual Note Note { get; set; }
    }
}
