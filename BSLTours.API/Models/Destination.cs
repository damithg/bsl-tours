using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using static System.Collections.Specialized.BitVector32;

namespace BSLTours.API.Models
{
    public class Destination
    {
        public int Id { get; set; }

        public string Excerpt { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public DestinationImageSet Images { get; set; }
        public bool Featured { get; set; }

        // Location information
        public string Region { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Address { get; set; }
        
        // Extended information
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public List<string> TransportOptions { get; set; }
        public List<string> Highlights { get; set; }
        
        // Planning information
        public string BestTimeToVisit { get; set; }
        public string NearestAirport { get; set; }
        public string RecommendedDuration { get; set; }
        public string WeatherInfo { get; set; }

        // SEO metadata
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public List<string> MetaKeywords { get; set; }
        public List<string> Tags { get; set; }
        public string Category { get; set; }


        // Features (e.g., Private Guided Tours, Exclusive Access)
        public List<Feature> Features { get; set; }

        // TravelTips
        public List<string> TravelTips { get; set; }

        // Gallery images
        public List<GalleryImage> GalleryImages { get; set; }
        
        // FAQs
        public List<FAQ> FAQs { get; set; }

        // Sections (e.g., text blocks, quotes, videos)
        public List<Section> Sections { get; set; }

        // Local experiences
        public List<LocalExperience> LocalExperiences { get; set; }

        // Related tours
        public List<RelatedTour> RelatedTours { get; set; }

        // Additional content
        public List<Activity> Activities { get; set; }
        public List<Experience> Experiences { get; set; }
        
        // Timestamps
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
    
    public class Feature
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; } // Optional: for icon representation
        public string ImageUrl { get; set; } // Optional: for image representation
    }


    public class GalleryImage
    {
        public string Url { get; set; }
        public string Alt { get; set; }
    }

    public class Experience
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
    }

    public class FAQ
    {
        public string Question { get; set; }
        public string Answer { get; set; }
    }


    public class Section
    {
        public string Type { get; set; } // e.g., "text", "quote", "video"
        public string Title { get; set; } // Optional: for section title
        public string Content { get; set; } // Main content or URL for videos
        public string Author { get; set; } // Optional: for quotes
    }

    public class LocalExperience
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }

    public class RelatedTour
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Excerpt { get; set; }
        public int Duration { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
    }


    public class DestinationImageSet
    {
        public string Thumbnail { get; set; }
        public string Card { get; set; }
        public string Banner { get; set; }
        public string Social { get; set; }
        public string Original { get; set; }
    }


    public class CreateDestinationDto
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Excerpt { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public DestinationImageSet Images { get; set; }
        public bool Featured { get; set; }

        // Location
        public string Region { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        // SEO
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public List<string> MetaKeywords { get; set; }
        public List<string> Tags { get; set; }
        public string Category { get; set; }

        // Practical info
        public string BestTimeToVisit { get; set; }
        public string NearestAirport { get; set; }
        public List<string> TransportOptions { get; set; }
        public List<string> TravelTips { get; set; }

        // Highlights
        public List<string> Highlights { get; set; }

        // Optional sections you might allow admins to add
        public List<Feature> Features { get; set; }
        public List<GalleryImage> GalleryImages { get; set; }
        public List<FAQ> FAQs { get; set; }
        public List<Section> Sections { get; set; }
        public List<LocalExperience> LocalExperiences { get; set; }
        public string RecommendedDuration { get; set; }
    }
}