using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using service.Models;

namespace service.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ApplicationPolicy")]
    public class EmployeesController : ControllerBase
    {
        private readonly RwaContext _context;

        public EmployeesController(RwaContext context)
        {
            _context = context;
        }

        // GET: api/Employees/Tasks/1
        [HttpGet("Tasks/{id}")]
        public async Task<ActionResult<dynamic>> GetTask(int id)
        { 
            return await _context.TasksLists
                .AsSplitQuery()
                .Where(t => t.ManagerId == 1)
                .Where(t => t.ContactId == 12)
                .Select(t => new {
                    id = t.TaskId,
                    text = t.Task.Task1.TrimEnd(' '),
                    startDate = t.StartDate,
                    dueDate = t.DueDate,
                    status = t.Status,
                    priority = t.Priority,
                    owner = t.Contact.EmployeeFullName,
                    company = t.Contact.Company.Name,
                    manager = t.Manager.EmployeeFullName,
                    activities = t.Task.ActivitiesLists.Select(a => new {
                        name = a.Activity.Activity1,
                        date = a.Date,
                        manager = a.Manager.EmployeeFullName,
                    }),
                    messages = t.Task.MessagesLists.Select(m => new {
                        text = m.Message.Message1,
                        subject = m.Message.Subject,
                        date = m.Date,
                        manager = m.Manager.EmployeeFullName,
                    }),
                    notes = t.Task.NotesLists.Select(n => new {
                        text = n.Note.Note1,
                        date = n.Date,
                        manager = n.Manager.EmployeeFullName,
                    }),
                })
                .FirstOrDefaultAsync(t => t.id == id);
        }

        // GET: api/Employees/Tasks
        [HttpGet("Tasks")]
        public async Task<ActionResult<dynamic>> GetTasks()
        {
            return await _context.TasksLists
                     .AsSplitQuery()
                     .Where(t => t.ManagerId == 1)
                     .Where(t => t.ContactId == 12)
                     .Select(t => new {
                         id = t.TaskId,
                         text = t.Task.Task1.TrimEnd(' '),
                         startDate = t.StartDate,
                         dueDate = t.DueDate,
                         status = t.Status,
                         priority = t.Priority,
                         owner = t.Contact.EmployeeFullName,
                         company = t.Contact.Company.Name,
                         manager = t.Manager.EmployeeFullName,
                         progress = t.Progress,
                         parentId = t.Task.ParentId,
                     })
                     .ToListAsync();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
