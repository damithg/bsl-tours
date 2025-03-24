namespace BSLTours.API.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Highlights { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
    }
}