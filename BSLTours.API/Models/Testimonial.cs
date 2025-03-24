using System;
using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class Testimonial
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateTestimonialDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        public string Content { get; set; }
        
        [StringLength(100)]
        public string Location { get; set; }
        
        public string ImageUrl { get; set; }
    }
}