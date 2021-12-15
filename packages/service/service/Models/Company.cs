using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace service.Models
{
    public partial class Company
    {
        public Company()
        {
            Contacts = new HashSet<Contact>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Contact> Contacts { get; set; }
    }
}
