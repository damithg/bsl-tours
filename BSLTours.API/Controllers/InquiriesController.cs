using Microsoft.AspNetCore.Mvc;
using BSLTours.API.Models;
using BSLTours.API.Services;

namespace BSLTours.API.Controllers
{
    [ApiController]
    [Route("api/inquiries")]
    public class InquiriesController : ControllerBase
    {
        private readonly IDataService _dataService;
        
        public InquiriesController(IDataService dataService)
        {
            _dataService = dataService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<Inquiry>> GetAll()
        {
            return Ok(_dataService.GetInquiries());
        }
        
        [HttpPost]
        public ActionResult<Inquiry> Create(Inquiry inquiry)
        {
            var created = _dataService.CreateInquiry(inquiry);
            return CreatedAtAction(nameof(GetAll), null, created);
        }
    }
}