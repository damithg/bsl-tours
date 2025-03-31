using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BSLTours.API.Models;
using BSLTours.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BSLTours.API.Controllers
{
    [ApiController]
    [Route("api/destinations")]
    public class DestinationsController : ControllerBase
    {
        //private readonly IDataService _dataService;
        private readonly IMapper _mapper;
        private readonly IStrapiService _strapiService;

        public DestinationsController(IMapper mapper, IStrapiService strapiService)
        {
           // _dataService = dataService;
            _mapper = mapper;
            _strapiService = strapiService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var rawData = await _strapiService.GetDestinationsAsync();
            var mapped = _mapper.Map<List<DestinationDto>>(rawData);
            return Ok(mapped);
        }

        //[HttpGet("{id:int}")]
        //public async Task<ActionResult<Destination>> GetDestinationById(int id)
        //{
        //    var destination = await _dataService.GetDestinationByIdAsync(id);

        //    if (destination == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(destination);
        //}

        [HttpGet("{slug}")]
        public async Task<ActionResult<DestinationDto>> GetDestinationBySlug(string slug)
        {
            var destination = await _strapiService.GetDestinationBySlugAsync(slug);

            if (destination == null)
            {
                return NotFound();
            }

            return Ok(destination);
        }


        //[HttpPost]
        //public async Task<ActionResult<Destination>> CreateDestination(CreateDestinationDto createDestinationDto)
        //{
        //    if (createDestinationDto == null)
        //    {
        //        return BadRequest();
        //    }

        //    var destination = await _dataService.CreateDestinationAsync(createDestinationDto);

        //    return CreatedAtAction(
        //        nameof(GetDestinationById), 
        //        new { id = destination.Id }, 
        //        destination);
        //}
    }
}
