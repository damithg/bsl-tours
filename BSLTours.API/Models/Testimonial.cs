namespace BSLTours.API.Models
{
    public class Testimonial
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}