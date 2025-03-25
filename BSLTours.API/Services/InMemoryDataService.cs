using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSLTours.API.Models;

namespace BSLTours.API.Services
{
    public class InMemoryDataService : IDataService
    {
        private readonly List<TourPackage> _tourPackages;
        private readonly List<Destination> _destinations;
        private readonly List<Testimonial> _testimonials;
        private readonly List<Inquiry> _inquiries;
        private readonly List<Subscriber> _subscribers;
        
        private int _nextTourPackageId = 1;
        private int _nextDestinationId = 1;
        private int _nextTestimonialId = 1;
        private int _nextInquiryId = 1;
        private int _nextSubscriberId = 1;
        
        public InMemoryDataService()
        {
            // Initialize collections
            _tourPackages = new List<TourPackage>();
            _destinations = new List<Destination>();
            _testimonials = new List<Testimonial>();
            _inquiries = new List<Inquiry>();
            _subscribers = new List<Subscriber>();
            
            // Seed initial data
            SeedData();
        }
        
        private void SeedData()
        {
            // Seed destinations
            var destinations = new[]
            {
                new Destination { 
                    Name = "Sigiriya Rock Fortress", 
                    Description = "Ancient rock fortress with frescoes and stunning views.", 
                    ImageUrl = "/images/destinations/sigiriya.jpg", 
                    Featured = true
                },
                new Destination { 
                    Name = "Kandy", 
                    Description = "Cultural capital and home to the Temple of the Sacred Tooth Relic.", 
                    ImageUrl = "/images/destinations/kandy.jpg", 
                    Featured = true
                },
                new Destination { 
                    Name = "Galle Fort", 
                    Description = "UNESCO World Heritage site with colonial architecture.", 
                    ImageUrl = "/images/destinations/galle.jpg", 
                    Featured = true
                },
                new Destination { 
                    Name = "Yala National Park", 
                    Description = "Famous for leopards and diverse wildlife.", 
                    ImageUrl = "/images/destinations/yala.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Ella", 
                    Description = "Mountain village with hiking trails and tea plantations.", 
                    ImageUrl = "/images/destinations/ella.jpg", 
                    Featured = false
                }
            };
            
            foreach (var destination in destinations)
            {
                destination.Id = _nextDestinationId++;
                _destinations.Add(destination);
            }
            
            // Seed tour packages
            var tourPackages = new[]
            {
                new TourPackage { 
                    Title = "Cultural Triangle Luxury Tour", 
                    Description = "Explore Sri Lanka's ancient cultural triangle with luxury accommodations.", 
                    ShortDescription = "7-day luxury tour of Sri Lanka's UNESCO World Heritage sites.",
                    ImageUrl = "/images/packages/cultural-triangle-luxury-tour.jpg",
                    Price = 1599,
                    Duration = 7,
                    Inclusions = "Luxury accommodation, Private guide, All meals, Entrance fees, Airport transfers", 
                    Itinerary = "Day 1: Arrive in Colombo\nDay 2: Colombo to Anuradhapura\nDay 3: Explore Anuradhapura\nDay 4: Polonnaruwa\nDay 5: Sigiriya and Dambulla\nDay 6: Kandy\nDay 7: Departure",
                    IsFeatured = true,
                    DestinationId = 1,
                    GalleryImages = new List<string> { 
                        "/images/gallery/cultural-1.jpg", 
                        "/images/gallery/cultural-2.jpg", 
                        "/images/gallery/cultural-3.jpg" 
                    }
                },
                new TourPackage { 
                    Title = "Beach Paradise Escape", 
                    Description = "Relax on Sri Lanka's pristine southern beaches with luxury beachfront villas.", 
                    ShortDescription = "5-day luxury beach vacation in southern Sri Lanka.",
                    ImageUrl = "/images/packages/beach-paradise.jpg",
                    Price = 1299,
                    Duration = 5,
                    Inclusions = "Luxury beachfront villa, All breakfasts, Private beach access, Airport transfers", 
                    Itinerary = "Day 1: Arrive in Colombo, transfer to Unawatuna\nDay 2: Beach relaxation\nDay 3: Galle Fort excursion\nDay 4: Whale watching (seasonal)\nDay 5: Departure",
                    IsFeatured = true,
                    DestinationId = 3,
                    GalleryImages = new List<string> { 
                        "/images/gallery/beach-1.jpg", 
                        "/images/gallery/beach-2.jpg", 
                        "/images/gallery/beach-3.jpg" 
                    }
                },
                new TourPackage { 
                    Title = "Wildlife Safari Adventure", 
                    Description = "Experience Sri Lanka's incredible wildlife with luxury tented camps in national parks.", 
                    ShortDescription = "6-day wildlife safari through Sri Lanka's top national parks.",
                    ImageUrl = "/images/packages/wildlife-safari-adventure.jpg",
                    Price = 1899,
                    Duration = 6,
                    Inclusions = "Luxury tented accommodation, Expert naturalist guides, All meals, Safari jeep tours, Park entrance fees", 
                    Itinerary = "Day 1: Arrive in Colombo\nDay 2: Transfer to Yala National Park\nDay 3: Yala safaris\nDay 4: Transfer to Udawalawe\nDay 5: Udawalawe safari and elephant transit home\nDay 6: Return to Colombo",
                    IsFeatured = true,
                    DestinationId = 4,
                    GalleryImages = new List<string> { 
                        "/images/gallery/wildlife-1.jpg", 
                        "/images/gallery/wildlife-2.jpg", 
                        "/images/gallery/wildlife-3.jpg" 
                    }
                }
            };
            
            foreach (var package in tourPackages)
            {
                package.Id = _nextTourPackageId++;
                _tourPackages.Add(package);
            }
            
            // Seed testimonials
            var testimonials = new[]
            {
                new Testimonial { 
                    Name = "Sarah Johnson", 
                    Content = "Our trip to Sri Lanka was absolutely incredible! The Cultural Triangle tour exceeded all expectations. Our guide was knowledgeable and attentive, and the luxury accommodations were stunning.", 
                    Location = "London, UK",
                    ImageUrl = "/images/testimonials/person1.jpg",
                    CreatedAt = DateTime.Now.AddMonths(-2)
                },
                new Testimonial { 
                    Name = "Michael Chen", 
                    Content = "The Wildlife Safari Adventure was the highlight of our year. We saw elephants, leopards, and countless birds. The luxury tented camps made us feel at home in the wilderness.", 
                    Location = "Toronto, Canada",
                    ImageUrl = "/images/testimonials/person2.jpg",
                    CreatedAt = DateTime.Now.AddMonths(-1)
                },
                new Testimonial { 
                    Name = "Emma Rodriguez", 
                    Content = "Beach Paradise Escape was truly paradise! The private villa, the pristine beaches, and the exceptional service made our honeymoon unforgettable. We're already planning our return!", 
                    Location = "Barcelona, Spain",
                    ImageUrl = "/images/testimonials/person3.jpg",
                    CreatedAt = DateTime.Now.AddDays(-15)
                }
            };
            
            foreach (var testimonial in testimonials)
            {
                testimonial.Id = _nextTestimonialId++;
                _testimonials.Add(testimonial);
            }
        }
        
        // Tour Package methods
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
        
        public Task<TourPackage> CreateTourPackageAsync(CreateTourPackageDto tourPackageDto)
        {
            var tourPackage = new TourPackage
            {
                Id = _nextTourPackageId++,
                Title = tourPackageDto.Title,
                Description = tourPackageDto.Description,
                ShortDescription = tourPackageDto.ShortDescription,
                ImageUrl = tourPackageDto.ImageUrl,
                Price = tourPackageDto.Price,
                Duration = tourPackageDto.Duration,
                Inclusions = tourPackageDto.Inclusions,
                Itinerary = tourPackageDto.Itinerary,
                IsFeatured = tourPackageDto.IsFeatured,
                DestinationId = tourPackageDto.DestinationId,
                GalleryImages = tourPackageDto.GalleryImages
            };
            
            _tourPackages.Add(tourPackage);
            return Task.FromResult(tourPackage);
        }
        
        // Destination methods
        public Task<IEnumerable<Destination>> GetDestinationsAsync()
        {
            return Task.FromResult(_destinations.AsEnumerable());
        }
        
        public Task<Destination> GetDestinationByIdAsync(int id)
        {
            return Task.FromResult(_destinations.FirstOrDefault(d => d.Id == id));
        }
        
        public Task<Destination> CreateDestinationAsync(CreateDestinationDto destinationDto)
        {
            var destination = new Destination
            {
                Id = _nextDestinationId++,
                Name = destinationDto.Name,
                Description = destinationDto.Description,
                ImageUrl = destinationDto.ImageUrl,
                Featured = destinationDto.Featured
            };
            
            _destinations.Add(destination);
            return Task.FromResult(destination);
        }
        
        // Testimonial methods
        public Task<IEnumerable<Testimonial>> GetTestimonialsAsync()
        {
            return Task.FromResult(_testimonials.AsEnumerable());
        }
        
        public Task<Testimonial> CreateTestimonialAsync(CreateTestimonialDto testimonialDto)
        {
            var testimonial = new Testimonial
            {
                Id = _nextTestimonialId++,
                Name = testimonialDto.Name,
                Content = testimonialDto.Content,
                Location = testimonialDto.Location,
                ImageUrl = testimonialDto.ImageUrl,
                CreatedAt = DateTime.Now
            };
            
            _testimonials.Add(testimonial);
            return Task.FromResult(testimonial);
        }
        
        // Inquiry methods
        public Task<IEnumerable<Inquiry>> GetInquiriesAsync()
        {
            return Task.FromResult(_inquiries.AsEnumerable());
        }
        
        public Task<Inquiry> CreateInquiryAsync(CreateInquiryDto inquiryDto)
        {
            var inquiry = new Inquiry
            {
                Id = _nextInquiryId++,
                Name = inquiryDto.Name,
                Email = inquiryDto.Email,
                Phone = inquiryDto.Phone,
                Message = inquiryDto.Message,
                TourPackageId = inquiryDto.TourPackageId,
                CreatedAt = DateTime.Now
            };
            
            _inquiries.Add(inquiry);
            return Task.FromResult(inquiry);
        }
        
        // Subscriber methods
        public Task<Subscriber> GetSubscriberByEmailAsync(string email)
        {
            return Task.FromResult(_subscribers.FirstOrDefault(s => s.Email.Equals(email, StringComparison.OrdinalIgnoreCase)));
        }
        
        public Task<Subscriber> AddSubscriberAsync(CreateSubscriberDto subscriberDto)
        {
            var subscriber = new Subscriber
            {
                Id = _nextSubscriberId++,
                Email = subscriberDto.Email,
                CreatedAt = DateTime.Now
            };
            
            _subscribers.Add(subscriber);
            return Task.FromResult(subscriber);
        }
    }
}