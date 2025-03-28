using System;
using System.Collections.Generic;

namespace BSLTours.API.Models
{
    public class TourPackage
    {
        public int Id { get; set; }

        public string Excerpt { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Duration { get; set; }
        public decimal Price { get; set; }
        public bool Featured { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Itinerary { get; set; }

        // Relationships
        public List<string> IncludedDestinations { get; set; } = new List<string>();
        public List<ItineraryDay> ItineraryDays { get; set; } = new List<ItineraryDay>();
    }

    public class CreateTourPackageDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Duration { get; set; }
        public decimal Price { get; set; }
        public bool Featured { get; set; }
        public string Itinerary { get; set; }
        public List<string> IncludedDestinations { get; set; } = new List<string>();
        public List<ItineraryDay> ItineraryDays { get; set; } = new List<ItineraryDay>();
    }
}
