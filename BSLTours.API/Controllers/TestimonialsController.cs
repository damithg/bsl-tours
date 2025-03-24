using Microsoft.AspNetCore.Mvc;
using BSLTours.API.Models;
using BSLTours.API.Services;

namespace BSLTours.API.Controllers
{
    [ApiController]
    [Route("api/testimonials")]
    public class TestimonialsController : ControllerBase
    {
        private readonly IDataService _dataService;
        
        public TestimonialsController(IDataService dataService)
        {
            _dataService = dataService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<Testimonial>> GetAll()
        {
            return Ok(_dataService.GetTestimonials());
        }
        
        [HttpPost]
        public ActionResult<Testimonial> Create(Testimonial testimonial)
        {
            var created = _dataService.CreateTestimonial(testimonial);
            return CreatedAtAction(nameof(GetAll), null, created);
        }
    }
}