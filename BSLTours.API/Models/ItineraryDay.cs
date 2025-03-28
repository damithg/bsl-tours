using System.Collections.Generic;

namespace BSLTours.API.Models
{
    public class ItineraryDay
    {
        public int Day { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Accommodation { get; set; }
        public List<Activity> Activities { get; set; } = new List<Activity>();
        public Meals Meals { get; set; } = new Meals();
    }

    public class Meals
    {
        public bool Breakfast { get; set; }
        public bool Lunch { get; set; }
        public bool Dinner { get; set; }
    }
}