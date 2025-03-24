using Microsoft.AspNetCore.Mvc;
using BSLTours.API.Models;
using BSLTours.API.Services;

namespace BSLTours.API.Controllers
{
    [ApiController]
    [Route("api/subscribers")]
    public class SubscribersController : ControllerBase
    {
        private readonly IDataService _dataService;
        
        public SubscribersController(IDataService dataService)
        {
            _dataService = dataService;
        }
        
        [HttpPost]
        public ActionResult<Subscriber> Create(Subscriber subscriber)
        {
            // Check if the email already exists
            var existing = _dataService.GetSubscriberByEmail(subscriber.Email);
            if (existing != null)
            {
                return BadRequest(new { message = "Email already subscribed" });
            }
            
            var created = _dataService.CreateSubscriber(subscriber);
            return CreatedAtAction(nameof(Create), null, created);
        }
    }
}