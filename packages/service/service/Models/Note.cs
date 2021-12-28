using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Note
    {
        public Note()
        {
            NotesLists = new HashSet<NotesList>();
        }

        public int Id { get; set; }
        public string? Note1 { get; set; }

        public virtual ICollection<NotesList> NotesLists { get; set; }
    }
}
