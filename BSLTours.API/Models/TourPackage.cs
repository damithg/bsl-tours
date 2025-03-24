using System;
using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class TourPackage
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int DurationDays { get; set; }

        [Required]
        public bool IsFeatured { get; set; }

        public string Inclusions { get; set; }

        public string Exclusions { get; set; }

        public string Itinerary { get; set; }
    }

    public class CreateTourPackageDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        [Range(1, 90)]
        public int DurationDays { get; set; }

        public bool IsFeatured { get; set; }

        public string Inclusions { get; set; }

        public string Exclusions { get; set; }

        public string Itinerary { get; set; }
    }
}