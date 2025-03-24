using System;
using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class Subscriber
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class CreateSubscriberDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}