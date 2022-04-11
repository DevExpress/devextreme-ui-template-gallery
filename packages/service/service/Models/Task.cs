using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Task
    {
        public Task()
        {
            TasksLists = new HashSet<TasksList>();
        }

        public int Id { get; set; }
        public string? Task1 { get; set; }

        public virtual ICollection<TasksList> TasksLists { get; set; }
        public virtual ICollection<ActivitiesList> ActivitiesLists { get; set; }
        public virtual ICollection<MessagesList> MessagesLists { get; set; }
        public virtual ICollection<NotesList> NotesLists { get; set; }
    }
}
