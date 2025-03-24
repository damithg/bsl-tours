using System;
using System.ComponentModel.DataAnnotations;

namespace BSLTours.API.Models
{
    public class Subscriber
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateSubscriberDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}