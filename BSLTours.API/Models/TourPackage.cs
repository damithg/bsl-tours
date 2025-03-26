using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace BSLTours.API.Models
{
    public class TourPackage
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public string Inclusions { get; set; }
        public string Itinerary { get; set; }
        public bool IsFeatured { get; set; }
        public int? DestinationId { get; set; }
        public List<string> GalleryImages { get; set; } = new List<string>();
        public int Rating { get; set; }
        public int ReviewCount { get; set; }
    }

    public class CreateTourPackageDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        
        public string Slug { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        [Required]
        [StringLength(200)]
        public string ShortDescription { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
        [Required]
        [Range(0, 10000)]
        public decimal Price { get; set; }
        
        [Required]
        [Range(1, 30)]
        public int Duration { get; set; }
        
        public string Inclusions { get; set; }
        
        public string Itinerary { get; set; }
        
        public bool IsFeatured { get; set; }
        
        public int? DestinationId { get; set; }
        
        public List<string> GalleryImages { get; set; } = new List<string>();
        public int Rating { get; set; }
        public int ReviewCount { get; set; }

        public void GenerateSlugFromTitle()
        {
            if (string.IsNullOrEmpty(Slug) && !string.IsNullOrEmpty(Title))
            {
                // Convert to lowercase, replace spaces with hyphens, and remove special characters
                Slug = Regex.Replace(Title.ToLower(), @"[^a-z0-9\s-]", "");
                Slug = Regex.Replace(Slug, @"\s+", "-");
                // Remove multiple consecutive hyphens
                Slug = Regex.Replace(Slug, @"-+", "-");
                // Trim hyphens from start and end
                Slug = Slug.Trim('-');
            }
        }
    }
}