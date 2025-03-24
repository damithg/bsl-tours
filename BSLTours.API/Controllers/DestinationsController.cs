using Microsoft.AspNetCore.Mvc;
using BSLTours.API.Models;
using BSLTours.API.Services;

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
        public ActionResult<IEnumerable<Destination>> GetAll()
        {
            return Ok(_dataService.GetDestinations());
        }
        
        [HttpGet("{id}")]
        public ActionResult<Destination> GetById(int id)
        {
            var destination = _dataService.GetDestinationById(id);
            if (destination == null)
                return NotFound();
                
            return Ok(destination);
        }
        
        [HttpPost]
        public ActionResult<Destination> Create(Destination destination)
        {
            var created = _dataService.CreateDestination(destination);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
    }
}