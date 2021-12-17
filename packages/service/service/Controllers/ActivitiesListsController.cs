using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using service.Models;

namespace service.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesListsController : ControllerBase
    {
        private readonly RwaContext _context;

        public ActivitiesListsController(RwaContext context)
        {
            _context = context;
        }

        // GET: api/ActivitiesLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivitiesList>>> GetActivitiesLists()
        {
            return await _context.ActivitiesLists.ToListAsync();
        }

        // GET: api/ActivitiesLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivitiesList>> GetActivitiesList(int id)
        {
            var activitiesList = await _context.ActivitiesLists.FindAsync(id);

            if (activitiesList == null)
            {
                return NotFound();
            }

            return activitiesList;
        }

        // PUT: api/ActivitiesLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivitiesList(int id, ActivitiesList activitiesList)
        {
            if (id != activitiesList.Id)
            {
                return BadRequest();
            }

            _context.Entry(activitiesList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivitiesListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ActivitiesLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActivitiesList>> PostActivitiesList(ActivitiesList activitiesList)
        {
            _context.ActivitiesLists.Add(activitiesList);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ActivitiesListExists(activitiesList.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetActivitiesList", new { id = activitiesList.Id }, activitiesList);
        }

        // DELETE: api/ActivitiesLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivitiesList(int id)
        {
            var activitiesList = await _context.ActivitiesLists.FindAsync(id);
            if (activitiesList == null)
            {
                return NotFound();
            }

            _context.ActivitiesLists.Remove(activitiesList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivitiesListExists(int id)
        {
            return _context.ActivitiesLists.Any(e => e.Id == id);
        }
    }
}
