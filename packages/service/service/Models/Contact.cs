using System;
using System.Collections.Generic;

namespace service.Models
{
    public partial class Contact
    {
        public Contact()
        {
            ActivitiesLists = new HashSet<ActivitiesList>();
            MessagesLists = new HashSet<MessagesList>();
            NotesLists = new HashSet<NotesList>();
            OpportunitiesLists = new HashSet<OpportunitiesList>();
            TasksLists = new HashSet<TasksList>();
        }

        public int Id { get; set; }
        public string? EmployeeFirstName { get; set; }
        public string? EmployeeLastName { get; set; }
        public string? EmployeeFullName { get; set; }
        public string? EmployeePrefix { get; set; }
        public string? EmployeeTitle { get; set; }
        public byte[]? EmployeePicture { get; set; }
        public string? EmployeeAddress { get; set; }
        public string? EmployeeCity { get; set; }
        public int? EmployeeStateId { get; set; }
        public int? EmployeeZipcode { get; set; }
        public string? EmployeeEmail { get; set; }
        public string? EmployeeSkype { get; set; }
        public string? EmployeeMobilePhone { get; set; }
        public string? EmployeeHomePhone { get; set; }
        public DateTime? EmployeeBirthDate { get; set; }
        public DateTime? EmployeeHireDate { get; set; }
        public int? EmployeeDepartmentId { get; set; }
        public string? EmployeeStatus { get; set; }
        public string? EmployeePersonalProfile { get; set; }
        public int? ProbationReason { get; set; }
        public byte[] SsmaTimeStamp { get; set; } = null!;
        public int? CompanyId { get; set; }

        public virtual Company? Company { get; set; }
        public virtual State? EmployeeState { get; set; }
        public virtual ICollection<ActivitiesList> ActivitiesLists { get; set; }
        public virtual ICollection<MessagesList> MessagesLists { get; set; }
        public virtual ICollection<NotesList> NotesLists { get; set; }
        public virtual ICollection<OpportunitiesList> OpportunitiesLists { get; set; }
        public virtual ICollection<TasksList> TasksLists { get; set; }
    }
}
