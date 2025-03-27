using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSLTours.API.Models;

namespace BSLTours.API.Services
{
    public class InMemoryDataService : IDataService
    {
        private readonly List<TourPackage> tourPackages;
        private readonly List<Destination> destinations;
        private readonly List<Testimonial> testimonials;
        private readonly List<Inquiry> inquiries;
        private readonly List<Subscriber> subscribers;

        private int tourPackageIdCounter = 1;
        private int destinationIdCounter = 1;
        private int testimonialIdCounter = 1;
        private int inquiryIdCounter = 1;
        private int subscriberIdCounter = 1;

        public InMemoryDataService()
        {
            tourPackages = new List<TourPackage>();
            destinations = new List<Destination>();
            testimonials = new List<Testimonial>();
            inquiries = new List<Inquiry>();
            subscribers = new List<Subscriber>();

            InitializeData();
        }

        private void InitializeData()
        {
            InitializeDestinations();
        }

        private void InitializeDestinations()
        {
            // Sigiriya Rock Fortress
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Sigiriya Rock Fortress",
                Slug = "sigiriya-rock-fortress",
                Description = "Ancient rock fortress with panoramic views and stunning frescoes",
                ImageUrl = "/images/destinations/sigiriya-rock-fortress-sri-lanka.jpg",
                Featured = true,
                
                // Location information
                Region = "Cultural Triangle",
                Latitude = "7.9572",
                Longitude = "80.7603",
                Address = "Sigiriya, Sri Lanka",
                
                // Extended information
                ShortDescription = "An ancient rock fortress and palace with spectacular views",
                FullDescription = "Rising dramatically from the central plains, the iconic rocky outcrop of Sigiriya is perhaps Sri Lanka's most dramatic sight. Near-vertical walls soar to a flat-topped summit that contains the ruins of an ancient civilization, thought to be once the epicenter of the short-lived kingdom of Kassapa.",
                Highlights = new List<string> { "Lion's Paw Entrance", "Ancient Frescoes", "Mirror Wall", "Water Gardens", "Panoramic Summit Views" },
                
                // Planning information
                BestTimeToVisit = "January to April",
                RecommendedDuration = "1-2 Days",
                WeatherInfo = "The dry season from January to April offers the most pleasant weather for climbing",
                TravelTips = new List<string>
                {
                    "Visit early morning to avoid crowds and heat",
                    "Bring plenty of water for the climb",
                    "Wear comfortable shoes for steep staircases",
                    "Allow 3-4 hours for the complete experience"
                },
                
                // Gallery Images
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "https://images.unsplash.com/photo-1583087253076-5d1315860eb8", Alt = "Sigiriya Rock Fortress - Main View" },
                    new GalleryImage { Url = "https://images.unsplash.com/photo-1627894966831-0c839fa78bfd", Alt = "Sigiriya Rock Fortress - Ancient Frescoes" },
                    new GalleryImage { Url = "https://images.unsplash.com/photo-1531259922615-206732e4349b", Alt = "Sigiriya Rock Fortress - Water Gardens" },
                    new GalleryImage { Url = "https://images.unsplash.com/photo-1618846042125-0a64dc7c3608", Alt = "Sigiriya Rock Fortress - Summit View" }
                },
                
                // Activities
                Activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Guided Historical Tour",
                        Description = "Explore the ancient fortress with expert archaeologists who bring the history to life",
                        ImageUrl = "/images/activities/sigiriya-guided-tour.jpg"
                    },
                    new Activity
                    {
                        Title = "Sunrise Photography",
                        Description = "Capture the amazing sunrise views with special early access before regular opening hours",
                        ImageUrl = "/images/activities/sigiriya-sunrise.jpg"
                    }
                },
                
                // FAQs
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "How difficult is the climb to the top of Sigiriya?",
                        Answer = "The climb involves approximately 1,200 steps and takes about 1.5 hours for the average person. While steep in places, there are plenty of rest points along the way."
                    },
                    new FAQ
                    {
                        Question = "Can I visit Sigiriya and Dambulla in one day?",
                        Answer = "Yes, many visitors combine these two UNESCO sites in a single day trip, although having more time allows for a more relaxed experience."
                    }
                },
                
                CreatedAt = DateTime.Now
            });

            // Galle Fort
            destinations.Add(new Destination
            {
                Id = destinationIdCounter++,
                Name = "Galle Fort",
                Slug = "galle-fort",
                Description = "Colonial charm with boutique hotels, cafes and ocean views",
                ImageUrl = "/images/destinations/galle-fort-sri-lanka.jpg",
                Featured = true,
                
                // Location information
                Region = "Southern Coast",
                Latitude = "6.0269",
                Longitude = "80.2167",
                Address = "Galle, Sri Lanka",
                
                // Extended information
                ShortDescription = "A preserved colonial-era fortress with charming streets and sweeping ocean views",
                FullDescription = "The historic Galle Fort, built by the Portuguese and later fortified by the Dutch in the 17th century, stands as one of Sri Lanka's most atmospheric colonial treasures. This UNESCO World Heritage site encompasses an entire peninsula, featuring charming cobblestone streets lined with Dutch colonial buildings, trendy cafes, luxury boutiques, and stylish hotels.",
                Highlights = new List<string> { "Rampart Walls", "Dutch Reformed Church", "Lighthouse", "Maritime Museum", "Boutique Shopping" },
                
                GalleryImages = new List<GalleryImage>
                {
                    new GalleryImage { Url = "https://images.unsplash.com/photo-1592454869436-cfee29fafa29", Alt = "Galle Fort - Ramparts View" },
                    new GalleryImage { Url = "https://images.unsplash.com/photo-1583087253076-5d1315860eb8", Alt = "Galle Fort - Lighthouse" },
                    new GalleryImage { Url = "https://images.unsplash.com/photo-1591331686811-80ebb77d0813", Alt = "Galle Fort - Colonial Architecture" }
                },
                
                // FAQs for Galle
                FAQs = new List<FAQ>
                {
                    new FAQ
                    {
                        Question = "How long does it take to walk around the Galle Fort ramparts?",
                        Answer = "A leisurely walk along the entire circumference of the fort walls takes approximately 1-1.5 hours, though many visitors spend longer to enjoy the views and take photographs."
                    },
                    new FAQ
                    {
                        Question = "Are there entrance fees to visit Galle Fort?",
                        Answer = "The fort itself is free to enter and explore. Some individual attractions within the fort, such as museums, may charge modest entrance fees."
                    }
                },
                
                CreatedAt = DateTime.Now
            });
        }

        // Destinations
        public async Task<IEnumerable<Destination>> GetDestinationsAsync()
        {
            return await Task.FromResult(destinations);
        }

        public async Task<Destination> GetDestinationByIdAsync(int id)
        {
            return await Task.FromResult(destinations.FirstOrDefault(d => d.Id == id));
        }

        public async Task<Destination> CreateDestinationAsync(CreateDestinationDto destinationDto)
        {
            var destination = new Destination
            {
                Id = destinationIdCounter++,
                Name = destinationDto.Name,
                Slug = destinationDto.Name.ToLower().Replace(" ", "-"),
                Description = destinationDto.Description,
                ImageUrl = destinationDto.ImageUrl,
                Featured = destinationDto.Featured,
                
                // Enhanced properties
                Region = destinationDto.Region,
                ShortDescription = destinationDto.ShortDescription,
                FullDescription = destinationDto.FullDescription,
                Highlights = destinationDto.Highlights,
                BestTimeToVisit = destinationDto.BestTimeToVisit,
                RecommendedDuration = destinationDto.RecommendedDuration,
                GalleryImages = destinationDto.GalleryImages,
                Activities = destinationDto.Activities,
                FAQs = destinationDto.FAQs,
                
                CreatedAt = DateTime.Now
            };
            
            destinations.Add(destination);
            return await Task.FromResult(destination);
        }

        // Stub methods for other required interface implementations
        
        public async Task<IEnumerable<TourPackage>> GetTourPackagesAsync()
        {
            return await Task.FromResult(tourPackages);
        }

        public async Task<IEnumerable<TourPackage>> GetFeaturedTourPackagesAsync()
        {
            return await Task.FromResult(tourPackages.Where(tp => tp.Featured).ToList());
        }

        public async Task<TourPackage> GetTourPackageByIdAsync(int id)
        {
            return await Task.FromResult(tourPackages.FirstOrDefault(tp => tp.Id == id));
        }

        public async Task<TourPackage> GetTourPackageBySlugAsync(string slug)
        {
            return await Task.FromResult(tourPackages.FirstOrDefault(tp => tp.Slug == slug));
        }

        public async Task<TourPackage> CreateTourPackageAsync(CreateTourPackageDto tourPackageDto)
        {
            // Simple placeholder implementation
            var tourPackage = new TourPackage { Id = tourPackageIdCounter++ };
            tourPackages.Add(tourPackage);
            return await Task.FromResult(tourPackage);
        }

        public async Task<IEnumerable<Testimonial>> GetTestimonialsAsync()
        {
            return await Task.FromResult(testimonials);
        }

        public async Task<Testimonial> CreateTestimonialAsync(CreateTestimonialDto testimonialDto)
        {
            // Simple placeholder implementation
            var testimonial = new Testimonial { Id = testimonialIdCounter++ };
            testimonials.Add(testimonial);
            return await Task.FromResult(testimonial);
        }

        public async Task<IEnumerable<Inquiry>> GetInquiriesAsync()
        {
            return await Task.FromResult(inquiries);
        }

        public async Task<Inquiry> CreateInquiryAsync(CreateInquiryDto inquiryDto)
        {
            // Simple placeholder implementation
            var inquiry = new Inquiry { Id = inquiryIdCounter++ };
            inquiries.Add(inquiry);
            return await Task.FromResult(inquiry);
        }

        public async Task<Subscriber> GetSubscriberByEmailAsync(string email)
        {
            return await Task.FromResult(subscribers.FirstOrDefault(s => s.Email == email));
        }

        public async Task<Subscriber> AddSubscriberAsync(CreateSubscriberDto subscriberDto)
        {
            // Simple placeholder implementation
            var subscriber = new Subscriber { Id = subscriberIdCounter++ };
            subscribers.Add(subscriber);
            return await Task.FromResult(subscriber);
        }
    }
}
