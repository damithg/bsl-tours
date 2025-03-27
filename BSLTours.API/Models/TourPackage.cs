using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
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
        
        [JsonIgnore]
        public List<ItineraryDay> ItineraryDays 
        { 
            get 
            {
                try 
                {
                    if (!string.IsNullOrEmpty(Itinerary) && Itinerary.StartsWith("["))
                    {
                        return System.Text.Json.JsonSerializer.Deserialize<List<ItineraryDay>>(Itinerary);
                    }
                    
                    // Fall back to parsing from string format if not JSON
                    return ParseItineraryFromString();
                }
                catch 
                {
                    return ParseItineraryFromString();
                }
            }
        }
        
        private List<ItineraryDay> ParseItineraryFromString()
        {
            if (string.IsNullOrEmpty(Itinerary))
                return new List<ItineraryDay>();
                
            var result = new List<ItineraryDay>();
            var lines = Itinerary.Split('\n');
            
            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line)) continue;
                
                var parts = line.Split(new[] { ':' }, 2);
                if (parts.Length < 2) continue;
                
                var dayPart = parts[0].Trim();
                var titlePart = parts[1].Trim();
                
                if (!dayPart.StartsWith("Day")) continue;
                
                // Handle ranges like "Day 6-7: Kandy"
                if (dayPart.Contains("-"))
                {
                    var dayRange = dayPart.Substring(4).Split('-');
                    if (dayRange.Length == 2 && int.TryParse(dayRange[0], out int start) && int.TryParse(dayRange[1], out int end))
                    {
                        for (int day = start; day <= end; day++)
                        {
                            result.Add(new ItineraryDay
                            {
                                Day = day,
                                Title = titlePart,
                                Description = $"Visit key attractions in {titlePart} with your private guide. Experience authentic Sri Lankan culture and cuisine.",
                                Accommodation = new Accommodation { Name = "Luxury Hotel" }
                            });
                        }
                    }
                }
                else
                {
                    // Regular single day entry
                    if (int.TryParse(dayPart.Substring(4), out int day))
                    {
                        result.Add(new ItineraryDay
                        {
                            Day = day,
                            Title = titlePart,
                            Description = $"Visit key attractions in {titlePart} with your private guide. Experience authentic Sri Lankan culture and cuisine.",
                            Accommodation = new Accommodation { Name = "Luxury Hotel" }
                        });
                    }
                }
            }
            
            return result;
        }
    }
    
    public class ItineraryDay
    {
        public int Day { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<Activity> Activities { get; set; } = new List<Activity>();
        public Accommodation Accommodation { get; set; } = new Accommodation();
        public Meals Meals { get; set; } = new Meals();
    }
    
    public class Activity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Time { get; set; }
    }
    
    public class Accommodation
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
    
    public class Meals
    {
        public bool Breakfast { get; set; }
        public bool Lunch { get; set; }
        public bool Dinner { get; set; }
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