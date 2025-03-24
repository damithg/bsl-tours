using BSLTours.API.Models;

namespace BSLTours.API.Services
{
    public class InMemoryDataService : IDataService
    {
        private readonly List<TourPackage> _tourPackages = new();
        private readonly List<Destination> _destinations = new();
        private readonly List<Testimonial> _testimonials = new();
        private readonly List<Inquiry> _inquiries = new();
        private readonly List<Subscriber> _subscribers = new();
        
        private int _nextTourPackageId = 1;
        private int _nextDestinationId = 1;
        private int _nextTestimonialId = 1;
        private int _nextInquiryId = 1;
        private int _nextSubscriberId = 1;
        
        public InMemoryDataService()
        {
            InitializeData();
        }
        
        private void InitializeData()
        {
            // Sample Tour Packages
            _tourPackages.Add(new TourPackage
            {
                Id = _nextTourPackageId++,
                Title = "Cultural Triangle Luxury Tour",
                Description = "Explore Sri Lanka's ancient cities and cultural heritage in luxury.",
                Duration = 7,
                Price = 1800,
                ImageUrl = "/images/packages/cultural-triangle.jpg",
                IsFeatured = true,
                Inclusions = "Luxury accommodation, Private transportation, English-speaking guide, All meals",
                Exclusions = "International flights, Personal expenses, Travel insurance",
                Itinerary = "Day 1: Colombo to Dambulla\nDay 2: Sigiriya Rock Fortress\nDay 3: Polonnaruwa Ancient City\nDay 4: Anuradhapura\nDay 5: Kandy\nDay 6: Peradeniya Botanical Gardens\nDay 7: Return to Colombo"
            });
            
            _tourPackages.Add(new TourPackage
            {
                Id = _nextTourPackageId++,
                Title = "Beach and Wildlife Safari",
                Description = "Experience the best beaches and wildlife encounters in Sri Lanka.",
                Duration = 10,
                Price = 2200,
                ImageUrl = "/images/packages/beach-wildlife.jpg",
                IsFeatured = true,
                Inclusions = "4-5 star accommodation, Private transportation, English-speaking guide, Safari jeep rides, All meals",
                Exclusions = "International flights, Personal expenses, Travel insurance, Alcoholic beverages",
                Itinerary = "Day 1-2: Colombo to Bentota\nDay 3-4: Bentota to Galle\nDay 5-6: Galle to Yala National Park\nDay 7-8: Yala to Mirissa\nDay 9-10: Mirissa to Colombo"
            });
            
            _tourPackages.Add(new TourPackage
            {
                Id = _nextTourPackageId++,
                Title = "Ceylon Tea Trails Luxury Experience",
                Description = "Journey through Sri Lanka's picturesque tea plantations with luxury stays.",
                Duration = 6,
                Price = 2500,
                ImageUrl = "/images/packages/tea-trails.jpg",
                IsFeatured = true,
                Inclusions = "5-star boutique accommodations, Private transportation, Tea factory tours, Fine dining experiences, All meals",
                Exclusions = "International flights, Personal expenses, Travel insurance",
                Itinerary = "Day 1: Colombo to Hatton\nDay 2-3: Tea plantation experiences\nDay 4: Nuwara Eliya visit\nDay 5: Adam's Peak (optional hike)\nDay 6: Return to Colombo"
            });
            
            // Sample Destinations
            _destinations.Add(new Destination
            {
                Id = _nextDestinationId++,
                Name = "Sigiriya Rock Fortress",
                Description = "Ancient rock fortress with frescoes and stunning views",
                ImageUrl = "/images/destinations/sigiriya.jpg",
                Location = "Central Province",
                Highlights = "Lion's Paw Entrance, Water Gardens, Mirror Wall, Cloud Maidens Frescoes, Panoramic Summit Views",
                IsFeatured = true
            });
            
            _destinations.Add(new Destination
            {
                Id = _nextDestinationId++,
                Name = "Galle Fort",
                Description = "UNESCO heritage site with colonial charm",
                ImageUrl = "/images/destinations/galle-fort.jpg",
                Location = "Southern Province",
                Highlights = "Dutch Colonial Architecture, Ramparts Walk, Lighthouse, Maritime Museum, Boutique Shops",
                IsFeatured = true
            });
            
            _destinations.Add(new Destination
            {
                Id = _nextDestinationId++,
                Name = "Yala National Park",
                Description = "Sri Lanka's premier wildlife sanctuary",
                ImageUrl = "/images/destinations/yala.jpg",
                Location = "Southern Province",
                Highlights = "Leopard Sightings, Elephant Herds, Diverse Bird Species, Beautiful Landscapes, Luxury Safari Camps",
                IsFeatured = true
            });
            
            // Sample Testimonials
            _testimonials.Add(new Testimonial
            {
                Id = _nextTestimonialId++,
                Name = "Sarah Johnson",
                Content = "Our trip to Sri Lanka exceeded all expectations. The cultural tour was thoughtfully organized with knowledgeable guides and luxurious accommodations. We'll cherish these memories forever!",
                Location = "United Kingdom",
                Rating = 5,
                ImageUrl = "/images/testimonials/sarah.jpg"
            });
            
            _testimonials.Add(new Testimonial
            {
                Id = _nextTestimonialId++,
                Name = "Michael Chen",
                Content = "The wildlife safari was incredible! We saw leopards, elephants, and so many birds. Our guide was exceptional at tracking animals and sharing his knowledge. Highly recommend!",
                Location = "Singapore",
                Rating = 5,
                ImageUrl = "/images/testimonials/michael.jpg"
            });
            
            _testimonials.Add(new Testimonial
            {
                Id = _nextTestimonialId++,
                Name = "Emma and Thomas",
                Content = "Our honeymoon in Sri Lanka was absolute perfection. The tea country accommodations were romantic and intimate. Every detail was taken care of, allowing us to simply enjoy our time together.",
                Location = "Australia",
                Rating = 5,
                ImageUrl = "/images/testimonials/emma-thomas.jpg"
            });
        }
        
        // Tour Package Methods
        public IEnumerable<TourPackage> GetTourPackages()
        {
            return _tourPackages;
        }
        
        public IEnumerable<TourPackage> GetFeaturedTourPackages()
        {
            return _tourPackages.Where(p => p.IsFeatured);
        }
        
        public TourPackage? GetTourPackageById(int id)
        {
            return _tourPackages.FirstOrDefault(p => p.Id == id);
        }
        
        public TourPackage CreateTourPackage(TourPackage tourPackage)
        {
            tourPackage.Id = _nextTourPackageId++;
            _tourPackages.Add(tourPackage);
            return tourPackage;
        }
        
        // Destination Methods
        public IEnumerable<Destination> GetDestinations()
        {
            return _destinations;
        }
        
        public Destination? GetDestinationById(int id)
        {
            return _destinations.FirstOrDefault(d => d.Id == id);
        }
        
        public Destination CreateDestination(Destination destination)
        {
            destination.Id = _nextDestinationId++;
            _destinations.Add(destination);
            return destination;
        }
        
        // Testimonial Methods
        public IEnumerable<Testimonial> GetTestimonials()
        {
            return _testimonials;
        }
        
        public Testimonial CreateTestimonial(Testimonial testimonial)
        {
            testimonial.Id = _nextTestimonialId++;
            _testimonials.Add(testimonial);
            return testimonial;
        }
        
        // Inquiry Methods
        public Inquiry CreateInquiry(Inquiry inquiry)
        {
            inquiry.Id = _nextInquiryId++;
            inquiry.CreatedAt = DateTime.UtcNow;
            _inquiries.Add(inquiry);
            return inquiry;
        }
        
        public IEnumerable<Inquiry> GetInquiries()
        {
            return _inquiries;
        }
        
        // Subscriber Methods
        public Subscriber CreateSubscriber(Subscriber subscriber)
        {
            subscriber.Id = _nextSubscriberId++;
            subscriber.CreatedAt = DateTime.UtcNow;
            _subscribers.Add(subscriber);
            return subscriber;
        }
        
        public Subscriber? GetSubscriberByEmail(string email)
        {
            return _subscribers.FirstOrDefault(s => s.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }
    }
}