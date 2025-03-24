using System;
using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class Testimonial
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Content { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class CreateTestimonialDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Content { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }
    }
}