using System;

namespace BSLTours.API.Models
{
    public class Subscriber
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}