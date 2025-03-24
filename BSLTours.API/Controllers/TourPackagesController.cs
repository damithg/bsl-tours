using System.Collections.Generic;
using System.Threading.Tasks;
using BSLTours.API.Models;
using BSLTours.API.Services;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<IEnumerable<TourPackage>>> GetAllTourPackages()
        {
            var tourPackages = await _dataService.GetTourPackagesAsync();
            return Ok(tourPackages);
        }

        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<TourPackage>>> GetFeaturedTourPackages()
        {
            var featuredPackages = await _dataService.GetFeaturedTourPackagesAsync();
            return Ok(featuredPackages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TourPackage>> GetTourPackageById(int id)
        {
            var tourPackage = await _dataService.GetTourPackageByIdAsync(id);
            
            if (tourPackage == null)
            {
                return NotFound();
            }
            
            return Ok(tourPackage);
        }

        [HttpPost]
        public async Task<ActionResult<TourPackage>> CreateTourPackage(CreateTourPackageDto tourPackageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tourPackage = await _dataService.CreateTourPackageAsync(tourPackageDto);
            return CreatedAtAction(nameof(GetTourPackageById), new { id = tourPackage.Id }, tourPackage);
        }
    }
}