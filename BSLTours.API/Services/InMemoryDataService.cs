using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSLTours.API.Models;

namespace BSLTours.API.Services
{
    public class InMemoryDataService : IDataService
    {
        private readonly List<TourPackage> _tourPackages = new List<TourPackage>();
        private readonly List<Destination> _destinations = new List<Destination>();
        private readonly List<Testimonial> _testimonials = new List<Testimonial>();
        private readonly List<Inquiry> _inquiries = new List<Inquiry>();
        private readonly List<Subscriber> _subscribers = new List<Subscriber>();
        
        private int _tourPackageIdCounter = 1;
        private int _destinationIdCounter = 1;
        private int _testimonialIdCounter = 1;
        private int _inquiryIdCounter = 1;
        private int _subscriberIdCounter = 1;

        public InMemoryDataService()
        {
            InitializeData();
        }

        private void InitializeData()
        {
            // Add Sample Tour Packages
            _tourPackages.Add(new TourPackage
            {
                Id = _tourPackageIdCounter++,
                Title = "Cultural Triangle Luxury Tour",
                Description = "Experience the ancient cities and cultural heritage of Sri Lanka in luxury.",
                ImageUrl = "/images/tours/cultural-triangle.jpg",
                Price = 1800,
                DurationDays = 7,
                IsFeatured = true,
                Inclusions = "Luxury accommodation, Private transportation, English-speaking guide, All entrance fees, Daily breakfast and dinner",
                Exclusions = "International flights, Personal expenses, Travel insurance, Alcoholic beverages",
                Itinerary = "Day 1: Arrival & Colombo City Tour\nDay 2: Colombo to Sigiriya\nDay 3: Sigiriya Rock Fortress & Polonnaruwa\nDay 4: Dambulla Cave Temple & Spice Garden\nDay 5: Kandy Temple of the Tooth\nDay 6: Kandy to Nuwara Eliya\nDay 7: Tea Plantation & Departure"
            });

            _tourPackages.Add(new TourPackage
            {
                Id = _tourPackageIdCounter++,
                Title = "Sri Lanka Wildlife Safari",
                Description = "Discover the incredible wildlife of Sri Lanka on this exclusive safari tour.",
                ImageUrl = "/images/tours/wildlife-safari.jpg",
                Price = 2100,
                DurationDays = 8,
                IsFeatured = true,
                Inclusions = "4x4 Jeep safaris, Accommodation in luxury tented camps, All meals, Expert naturalist guides, Park entrance fees, Conservation contribution",
                Exclusions = "International flights, Alcoholic beverages, Personal expenses, Travel insurance",
                Itinerary = "Day 1: Arrival & Transfer to Yala\nDay 2-3: Yala National Park Safaris\nDay 4: Transfer to Udawalawe\nDay 5-6: Udawalawe National Park\nDay 7: Elephant Transit Home & Sinharaja Forest\nDay 8: Return to Colombo & Departure"
            });

            _tourPackages.Add(new TourPackage
            {
                Id = _tourPackageIdCounter++,
                Title = "Coastal Paradise Retreat",
                Description = "Relax and unwind on the pristine beaches of southern Sri Lanka.",
                ImageUrl = "/images/tours/coastal-paradise.jpg",
                Price = 1600,
                DurationDays = 6,
                IsFeatured = true,
                Inclusions = "Beachfront luxury accommodation, Daily breakfast and dinner, Whale watching excursion, Spa treatment, Airport transfers",
                Exclusions = "International flights, Lunch, Personal expenses, Travel insurance, Optional activities",
                Itinerary = "Day 1: Arrival & Transfer to Bentota\nDay 2: Bentota Beach & River Safari\nDay 3: Transfer to Mirissa\nDay 4: Whale Watching & Galle Fort Visit\nDay 5: Beach Day & Spa Treatment\nDay 6: Return to Colombo & Departure"
            });

            // Add Sample Destinations
            _destinations.Add(new Destination
            {
                Id = _destinationIdCounter++,
                Name = "Sigiriya Rock Fortress",
                Description = "An ancient rock fortress with remarkable frescoes and landscaped gardens.",
                ImageUrl = "/images/destinations/sigiriya.jpg",
                Highlights = "5th century palace ruins, Mirror wall, Lion's paw entrance, Breathtaking panoramic views",
                Location = "Central Province, Sri Lanka"
            });

            _destinations.Add(new Destination
            {
                Id = _destinationIdCounter++,
                Name = "Yala National Park",
                Description = "Sri Lanka's most famous wildlife reserve, home to the highest leopard density in the world.",
                ImageUrl = "/images/destinations/yala.jpg",
                Highlights = "Leopards, Elephants, Sloth bears, Crocodiles, 215 bird species",
                Location = "Southeast Sri Lanka"
            });

            _destinations.Add(new Destination
            {
                Id = _destinationIdCounter++,
                Name = "Galle Fort",
                Description = "A UNESCO World Heritage site with colonial architecture and vibrant culture.",
                ImageUrl = "/images/destinations/galle.jpg",
                Highlights = "Dutch colonial buildings, Ancient ramparts, Lighthouse, Boutique shops and cafes",
                Location = "Southern Province, Sri Lanka"
            });

            // Add Sample Testimonials
            _testimonials.Add(new Testimonial
            {
                Id = _testimonialIdCounter++,
                Name = "Sarah Johnson",
                Content = "Our trip to Sri Lanka was absolutely magical. The itinerary was perfectly balanced with culture, wildlife, and relaxation. Our guide was knowledgeable and personable, making the experience even more special.",
                ImageUrl = "/images/testimonials/sarah.jpg",
                Location = "United Kingdom",
                CreatedAt = DateTime.UtcNow.AddMonths(-2)
            });

            _testimonials.Add(new Testimonial
            {
                Id = _testimonialIdCounter++,
                Name = "David Chen",
                Content = "The wildlife safari exceeded all our expectations. We saw leopards on three separate occasions! The accommodations were luxurious yet authentic. We can't wait to return to beautiful Sri Lanka.",
                ImageUrl = "/images/testimonials/david.jpg",
                Location = "Canada",
                CreatedAt = DateTime.UtcNow.AddMonths(-1)
            });
        }

        // TourPackage Methods
        public Task<IEnumerable<TourPackage>> GetTourPackagesAsync()
        {
            return Task.FromResult(_tourPackages.AsEnumerable());
        }

        public Task<IEnumerable<TourPackage>> GetFeaturedTourPackagesAsync()
        {
            return Task.FromResult(_tourPackages.Where(p => p.IsFeatured).AsEnumerable());
        }

        public Task<TourPackage> GetTourPackageByIdAsync(int id)
        {
            return Task.FromResult(_tourPackages.FirstOrDefault(p => p.Id == id));
        }

        public Task<TourPackage> CreateTourPackageAsync(CreateTourPackageDto dto)
        {
            var tourPackage = new TourPackage
            {
                Id = _tourPackageIdCounter++,
                Title = dto.Title,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                Price = dto.Price,
                DurationDays = dto.DurationDays,
                IsFeatured = dto.IsFeatured,
                Inclusions = dto.Inclusions,
                Exclusions = dto.Exclusions,
                Itinerary = dto.Itinerary
            };

            _tourPackages.Add(tourPackage);
            return Task.FromResult(tourPackage);
        }

        // Destination Methods
        public Task<IEnumerable<Destination>> GetDestinationsAsync()
        {
            return Task.FromResult(_destinations.AsEnumerable());
        }

        public Task<Destination> GetDestinationByIdAsync(int id)
        {
            return Task.FromResult(_destinations.FirstOrDefault(d => d.Id == id));
        }

        public Task<Destination> CreateDestinationAsync(CreateDestinationDto dto)
        {
            var destination = new Destination
            {
                Id = _destinationIdCounter++,
                Name = dto.Name,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                Highlights = dto.Highlights,
                Location = dto.Location
            };

            _destinations.Add(destination);
            return Task.FromResult(destination);
        }

        // Testimonial Methods
        public Task<IEnumerable<Testimonial>> GetTestimonialsAsync()
        {
            return Task.FromResult(_testimonials.AsEnumerable());
        }

        public Task<Testimonial> CreateTestimonialAsync(CreateTestimonialDto dto)
        {
            var testimonial = new Testimonial
            {
                Id = _testimonialIdCounter++,
                Name = dto.Name,
                Content = dto.Content,
                ImageUrl = dto.ImageUrl,
                Location = dto.Location,
                CreatedAt = DateTime.UtcNow
            };

            _testimonials.Add(testimonial);
            return Task.FromResult(testimonial);
        }

        // Inquiry Methods
        public Task<IEnumerable<Inquiry>> GetInquiriesAsync()
        {
            return Task.FromResult(_inquiries.AsEnumerable());
        }

        public Task<Inquiry> CreateInquiryAsync(CreateInquiryDto dto)
        {
            var inquiry = new Inquiry
            {
                Id = _inquiryIdCounter++,
                Name = dto.Name,
                Email = dto.Email,
                Subject = dto.Subject,
                Message = dto.Message,
                Phone = dto.Phone,
                CreatedAt = DateTime.UtcNow
            };

            _inquiries.Add(inquiry);
            return Task.FromResult(inquiry);
        }

        // Subscriber Methods
        public Task<Subscriber> GetSubscriberByEmailAsync(string email)
        {
            return Task.FromResult(_subscribers.FirstOrDefault(s => s.Email.ToLower() == email.ToLower()));
        }

        public Task<Subscriber> AddSubscriberAsync(CreateSubscriberDto dto)
        {
            var subscriber = new Subscriber
            {
                Id = _subscriberIdCounter++,
                Email = dto.Email,
                CreatedAt = DateTime.UtcNow
            };

            _subscribers.Add(subscriber);
            return Task.FromResult(subscriber);
        }
    }
}