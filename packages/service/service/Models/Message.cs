using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Message
    {
        public Message()
        {
            MessagesLists = new HashSet<MessagesList>();
        }

        public int Id { get; set; }
        public string? Message1 { get; set; }
        public string? Subject { get; set; }

        public virtual ICollection<MessagesList> MessagesLists { get; set; }
    }
}
