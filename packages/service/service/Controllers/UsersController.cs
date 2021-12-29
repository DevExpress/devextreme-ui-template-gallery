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
    public class UsersController : ControllerBase
    {
        private readonly RwaContext _context;

        public UsersController(RwaContext context)
        {
            _context = context;
        }

        // GET: api/Users/Contacts
        [HttpGet("Contacts")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetContacts()
        {
            return await _context.Contacts
                .Include(c => c.Company)
                .Include(c => c.ActivitiesLists)
                .Select(s => new {
                    s.Id,
                    Name = s.EmployeeFullName,
                    Position = s.EmployeeTitle,
                    Status = s.EmployeeStatus,
                    Company = s.Company.Name,
                    Phone = s.EmployeeMobilePhone,
                    Email = s.EmployeeEmail,
                    AssignedTo = s.ActivitiesLists.First().Manager.EmployeeFullName
                })
                .ToListAsync();
        }

        // GET: api/Users/Contacts/10
        [HttpGet("Contacts/{id}")]
        public async Task<ActionResult<dynamic>> GetContact(int id)
        {
            return await _context.Contacts
                //.Include(_ => _.Company)
                .Include(_ => _.ActivitiesLists)
                .Include(_ => _.OpportunitiesLists)
                .Include(_ => _.EmployeeState)
                .Include(_ => _.TasksLists)
                .AsSplitQuery()
                .Select(s => new {
                    id = s.Id,
                    name = s.EmployeeFullName,
                    firstName = s.EmployeeFirstName,
                    lastName = s.EmployeeLastName,
                    city = s.EmployeeCity,
                    state = s.EmployeeState,
                    zipCode = s.EmployeeZipcode,
                    status = s.EmployeeStatus,
                    company = s.Company.Name,
                    position = s.EmployeeTitle,
                    manager = s.ActivitiesLists.First().Manager.EmployeeFullName,
                    phone = s.EmployeeMobilePhone,
                    email = s.EmployeeEmail,
                    address = s.EmployeeAddress,
                    activities = s.ActivitiesLists.Select(a => new {
                        name = a.Activity.Activity1,
                        date = a.Date,
                        manager = a.Manager.EmployeeFullName,
                    }),
                    opportunities = s.OpportunitiesLists.Select(o => new {
                        name = o.Opportunity.Opportunity1,
                        price = o.ProductsOpportunitiesLists.Sum(p => p.Product.ProductCost),
                    }),
                    tasks = s.TasksLists.Select(t => new {
                        text = t.Task.Task1.TrimEnd(' '),
                        date = t.Date,
                        done = t.Done,
                    }),
                    image = s.EmployeePicture,
                })
                .FirstOrDefaultAsync(_ => _.id == id);
        }

        // GET: api/Users/Statuses
        [HttpGet("Statuses")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetStatuses() {
            return await _context.Contacts
               .Select(s => new
               {
                   text = s.EmployeeStatus,
                   status = s.EmployeeStatus,
               }).Distinct().ToListAsync();
        }

        // GET: api/Users/States
        [HttpGet("States")]
        public async Task<ActionResult<IEnumerable<State>>> GetStates()
        {
            return await _context.States.ToListAsync();
        }

        // GET: api/Users/Contacts/10/Opportunities
        [HttpGet("Contacts/{id}/Opportunities")]
        public async Task<ActionResult<dynamic>> GetOpportunities(int id) {
            return await _context.OpportunitiesLists
                .Where(o => o.ContactId == id)              
                .Select(o => new
                {
                    name = o.Opportunity.Opportunity1,
                    manager = o.Manager.EmployeeFullName,
                    products = o.ProductsOpportunitiesLists.Count(),
                    total = o.ProductsOpportunitiesLists.Sum(p => p.Product.ProductCost)
                })
                .ToListAsync();
        }

        // GET: api/Users/Contacts/10/Notes
        [HttpGet("Contacts/{id}/Notes")]
        public async Task<ActionResult<dynamic>> GetNotes(int id)
        {
            return await _context.NotesLists
                .Where(n => n.ContactId == id)
                .Select(n => new
                {
                    text = n.Note.Note1,
                    date = n.Date,
                    manager = n.Manager.EmployeeFullName,
                })
                .ToListAsync();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}
