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

namespace service
{
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

        // GET: api/Contacts
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

        // GET: api/Contacts
        [HttpGet("Contacts/{id}")]
        public async Task<ActionResult<dynamic>> GetContact(int id)
        {
            return await _context.Contacts
                //.Include(_ => _.Company)
                .Include(_ => _.ActivitiesLists)
                .Include(_ => _.OpportunitiesLists)
                .AsSplitQuery()
                .Select(s => new {
                    id = s.Id,
                    name = s.EmployeeFullName,
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
                    image = s.EmployeePicture,
                })
                .FirstOrDefaultAsync(_ => _.id == id);
        }


        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}
