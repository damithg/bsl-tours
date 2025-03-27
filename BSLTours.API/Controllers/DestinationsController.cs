using System.Collections.Generic;
using System.Threading.Tasks;
using BSLTours.API.Models;
using BSLTours.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BSLTours.API.Controllers
{
    [ApiController]
    [Route("api/destinations")]
    public class DestinationsController : ControllerBase
    {
        private readonly IDataService _dataService;

        public DestinationsController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destination>>> GetAllDestinations()
        {
            var destinations = await _dataService.GetDestinationsAsync();
            return Ok(destinations);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Destination>> GetDestinationById(int id)
        {
            var destination = await _dataService.GetDestinationByIdAsync(id);
            
            if (destination == null)
            {
                return NotFound();
            }
            
            return Ok(destination);
        }
        
        [HttpGet("{slug}")]
        public async Task<ActionResult<Destination>> GetDestinationBySlug(string slug)
        {
            var destination = await _dataService.GetDestinationBySlugAsync(slug);
            
            if (destination == null)
            {
                return NotFound();
            }
            
            return Ok(destination);
        }

        [HttpPost]
        public async Task<ActionResult<Destination>> CreateDestination(CreateDestinationDto createDestinationDto)
        {
            if (createDestinationDto == null)
            {
                return BadRequest();
            }
            
            var destination = await _dataService.CreateDestinationAsync(createDestinationDto);
            
            return CreatedAtAction(
                nameof(GetDestinationById), 
                new { id = destination.Id }, 
                destination);
        }
    }
}
