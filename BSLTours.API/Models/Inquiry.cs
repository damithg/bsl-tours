using System;
using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class Inquiry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
        public int? TourPackageId { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateInquiryDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Phone]
        public string Phone { get; set; }
        
        [Required]
        public string Message { get; set; }
        
        public int? TourPackageId { get; set; }
    }
}