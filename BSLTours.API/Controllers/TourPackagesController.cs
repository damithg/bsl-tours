using Microsoft.AspNetCore.Mvc;
using BSLTours.API.Models;
using BSLTours.API.Services;

namespace BSLTours.API.Controllers
{
    [ApiController]
    [Route("api/tour-packages")]
    public class TourPackagesController : ControllerBase
    {
        private readonly IDataService _dataService;
        
        public TourPackagesController(IDataService dataService)
        {
            _dataService = dataService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<TourPackage>> GetAll()
        {
            return Ok(_dataService.GetTourPackages());
        }
        
        [HttpGet("featured")]
        public ActionResult<IEnumerable<TourPackage>> GetFeatured()
        {
            return Ok(_dataService.GetFeaturedTourPackages());
        }
        
        [HttpGet("{id}")]
        public ActionResult<TourPackage> GetById(int id)
        {
            var tourPackage = _dataService.GetTourPackageById(id);
            if (tourPackage == null)
                return NotFound();
                
            return Ok(tourPackage);
        }
        
        [HttpPost]
        public ActionResult<TourPackage> Create(TourPackage tourPackage)
        {
            var created = _dataService.CreateTourPackage(tourPackage);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
    }
}