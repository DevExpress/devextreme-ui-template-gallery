using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class State
    {
        public State()
        {
            Contacts = new HashSet<Contact>();
        }

        public int SateId { get; set; }
        public string? StateShort { get; set; }
        public string? StateLong { get; set; }
        public string? StateCoords { get; set; }
        public byte[]? Flag48px { get; set; }
        public byte[]? Flag24px { get; set; }
        public byte[] SsmaTimeStamp { get; set; } = null!;

        public virtual ICollection<Contact> Contacts { get; set; }
    }
}
