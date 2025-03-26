using System.Collections.Generic;
using System.Threading.Tasks;
using BSLTours.API.Models;
using BSLTours.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BSLTours.API.Controllers
{
    [ApiController]
    [Route("api/tour-packages")]
    public class TourPackagesController : ControllerBase
    {
        private readonly IDataService _dataService;
        private readonly ILogger<TourPackagesController> _logger;

        public TourPackagesController(IDataService dataService, ILogger<TourPackagesController> logger)
        {
            _dataService = dataService;
            _logger = logger;
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
            var tourPackages = await _dataService.GetFeaturedTourPackagesAsync();
            return Ok(tourPackages);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TourPackage>> GetTourPackageById(int id)
        {
            var tourPackage = await _dataService.GetTourPackageByIdAsync(id);
            
            if (tourPackage == null)
            {
                return NotFound();
            }
            
            return Ok(tourPackage);
        }

        [HttpGet("by-slug/{slug}")]
        public async Task<ActionResult<TourPackage>> GetTourPackageBySlug(string slug)
        {
            _logger.LogInformation($"Looking for tour package with slug: {slug}");
            
            var tourPackage = await _dataService.GetTourPackageBySlugAsync(slug);
            
            if (tourPackage == null)
            {
                _logger.LogWarning($"Tour package with slug '{slug}' not found");
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