using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

        // Location information
        public string Region { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Address { get; set; }
        
        // Extended information
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public List<string> Highlights { get; set; }
        
        // Planning information
        public string BestTimeToVisit { get; set; }
        public string RecommendedDuration { get; set; }
        public string WeatherInfo { get; set; }
        public List<string> TravelTips { get; set; }
        
        // Additional media
        public List<GalleryImage> GalleryImages { get; set; }
        
        // Additional content
        public List<Activity> Activities { get; set; }
        public List<Experience> Experiences { get; set; }
        public List<FAQ> FAQs { get; set; }
        
        // Timestamps
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class GalleryImage
    {
        public string Url { get; set; }
        public string Alt { get; set; }
    }

    public class Activity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
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

    public class CreateDestinationDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public bool Featured { get; set; }

        // Additional properties for the enhanced model
        public string Region { get; set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public List<string> Highlights { get; set; }
        public string BestTimeToVisit { get; set; }
        public string RecommendedDuration { get; set; }
        public List<GalleryImage> GalleryImages { get; set; }
        public List<Activity> Activities { get; set; }
        public List<FAQ> FAQs { get; set; }
    }
}