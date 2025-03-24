using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class Destination
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string Highlights { get; set; }

        public string Location { get; set; }
    }

    public class CreateDestinationDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string Highlights { get; set; }

        public string Location { get; set; }
    }
}