using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; } 
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public bool Featured { get; set; }
    }

    public class CreateDestinationDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
        public bool Featured { get; set; }
    }
}