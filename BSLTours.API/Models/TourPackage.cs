namespace BSLTours.API.Models
{
    public class TourPackage
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
        public string Inclusions { get; set; } = string.Empty;
        public string Exclusions { get; set; } = string.Empty;
        public string Itinerary { get; set; } = string.Empty;
    }
}