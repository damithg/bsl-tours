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
                    Description = "Ancient rock fortress with panoramic views and stunning frescoes", 
                    ImageUrl = "/images/destinations/sigiriya-rock-fortress-sri-lanka.jpg", 
                    Featured = true
                },
                new Destination { 
                    Name = "Galle Fort", 
                    Description = "Colonial charm with boutique hotels, cafes and ocean views", 
                    ImageUrl = "/images/destinations/galle-fort-sri-lanka.jpg", 
                    Featured = true
                },
                new Destination { 
                    Name = "Yala National Park", 
                    Description = "Luxury safari experiences with the highest leopard density in the world", 
                    ImageUrl = "/images/destinations/yala-national-park-sri-lanka.jpg", 
                    Featured = true
                },
                new Destination { 
                    Name = "Ella", 
                    Description = "Mountain vistas, tea plantations, and iconic Nine Arch Bridge", 
                    ImageUrl = "/images/destinations/ella-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Bentota Beach", 
                    Description = "Pristine golden sands with luxury beach resorts and water sports", 
                    ImageUrl = "/images/destinations/bentota-beach-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Kandy", 
                    Description = "Sacred Temple of the Tooth and serene lake surrounded by hills", 
                    ImageUrl = "/images/destinations/kandy-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Polonnaruwa", 
                    Description = "Ancient city with well-preserved ruins and impressive stone carvings", 
                    ImageUrl = "/images/destinations/polonnaruwa-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Dambulla Cave Temple", 
                    Description = "UNESCO World Heritage site with ancient Buddha statues and painted murals", 
                    ImageUrl = "/images/destinations/dambulla-cave-temple-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Anuradhapura", 
                    Description = "Sri Lanka's ancient capital with sacred Bo Tree and majestic stupas", 
                    ImageUrl = "/images/destinations/anuradhapura-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Nuwara Eliya", 
                    Description = "Little England with Tudor-style cottages and world-class tea estates", 
                    ImageUrl = "/images/destinations/nuwara-eliya-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Adam's Peak", 
                    Description = "Sacred mountain pilgrimage with breathtaking sunrise views", 
                    ImageUrl = "/images/destinations/adams-peak-sri-lanka.jpg", 
                    Featured = false
                },
                new Destination { 
                    Name = "Mirissa", 
                    Description = "Idyllic beach with luxury villas and world-class whale watching", 
                    ImageUrl = "/images/destinations/mirissa-sri-lanka.jpg", 
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
                    Description = "Explore ancient cities, sacred temples, and the cultural heart of Sri Lanka with luxury accommodations.", 
                    ShortDescription = "10-day luxury tour of Sri Lanka's UNESCO World Heritage sites.",
                    ImageUrl = "/images/packages/cultural-triangle-luxury-tour.jpg",
                    Price = 3899,
                    Duration = 10,
                    Inclusions = "Luxury accommodation, Private guide, All meals, Entrance fees, Airport transfers", 
                    Itinerary = "Day 1: Arrive in Colombo\nDay 2: Colombo to Anuradhapura\nDay 3: Explore Anuradhapura\nDay 4: Polonnaruwa\nDay 5: Sigiriya and Dambulla\nDay 6-7: Kandy\nDay 8: Nuwara Eliya\nDay 9: Colombo\nDay 10: Departure",
                    IsFeatured = true,
                    DestinationId = 1,
                    Rating = 50,
                    ReviewCount = 24,
                    GalleryImages = new List<string> { 
                        "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1629385697093-57be2cc97fa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1596721984356-460463d52c55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                    }
                },
                new TourPackage { 
                    Title = "Coastal Serenity Escape", 
                    Description = "Indulge in beachfront luxury with private villa stays, spa treatments, and pristine beaches.", 
                    ShortDescription = "7-day luxury beach vacation in southern Sri Lanka.",
                    ImageUrl = "/images/packages/coastal-serenity-escape-sri-lanka.jpg",
                    Price = 2499,
                    Duration = 7,
                    Inclusions = "Luxury beachfront villa, All meals, Private beach access, Spa treatments, Airport transfers", 
                    Itinerary = "Day 1: Arrive in Colombo, transfer to beach villa\nDay 2-3: Beach relaxation and spa\nDay 4: Galle Fort excursion\nDay 5: Whale watching (seasonal)\nDay 6: Beach activities\nDay 7: Departure",
                    IsFeatured = true,
                    DestinationId = 2,
                    Rating = 48,
                    ReviewCount = 19,
                    GalleryImages = new List<string> { 
                        "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1540202403-b7abd6747a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1578922463125-c43562a8e4the15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                    }
                },
                new TourPackage { 
                    Title = "Hill Country Tea Trails", 
                    Description = "Journey through misty mountains, tea plantations, and colonial-era luxury bungalows.", 
                    ShortDescription = "8-day luxury tea country experience in Sri Lanka's highlands.",
                    ImageUrl = "/images/packages/hill-country-tea-trails-sri-lanka.jpg",
                    Price = 2799,
                    Duration = 8,
                    Inclusions = "Luxury plantation bungalows, All gourmet meals, Private tea tours, Train journeys, Transportation", 
                    Itinerary = "Day 1: Colombo to Hatton\nDay 2-3: Tea plantation immersion\nDay 4: Nuwara Eliya\nDay 5: Horton Plains excursion\nDay 6: Ella\nDay 7: Nine Arch Bridge and Little Adam's Peak\nDay 8: Return to Colombo",
                    IsFeatured = true,
                    DestinationId = 4,
                    Rating = 50,
                    ReviewCount = 28,
                    GalleryImages = new List<string> { 
                        "https://images.unsplash.com/photo-1575373547484-97224dad87e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1590239926314-75626cd9958c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1544644424-85a901bd5bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                    }
                },
                new TourPackage { 
                    Title = "Wildlife Safari Experience", 
                    Description = "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.", 
                    ShortDescription = "6-day wildlife safari through Sri Lanka's top national parks.",
                    ImageUrl = "/images/packages/wildlife-safari-experience-sri-lanka.jpg",
                    Price = 2199,
                    Duration = 6,
                    Inclusions = "Luxury tented accommodation, Expert naturalist guides, All meals, Safari jeep tours, Park entrance fees", 
                    Itinerary = "Day 1: Arrive in Colombo\nDay 2: Transfer to Yala National Park\nDay 3: Yala safaris\nDay 4: Transfer to Udawalawe\nDay 5: Udawalawe safari and elephant transit home\nDay 6: Return to Colombo",
                    IsFeatured = true,
                    DestinationId = 3,
                    Rating = 47,
                    ReviewCount = 15,
                    GalleryImages = new List<string> { 
                        "https://images.unsplash.com/photo-1624991982486-7e1b8c6ed47d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1627663899322-ebb023b9ae13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1581996323777-9158de7e931f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                    }
                },
                new TourPackage { 
                    Title = "Luxury Family Adventure", 
                    Description = "Create unforgettable memories with your loved ones on this family-friendly luxury tour through Sri Lanka's highlights.", 
                    ShortDescription = "12-day family adventure across Sri Lanka.",
                    ImageUrl = "/images/packages/luxury-family-adventure-sri-lanka.jpg",
                    Price = 3599,
                    Duration = 12,
                    Inclusions = "Family-friendly luxury accommodations, All meals, Kid-friendly activities, Private transport, Experienced guides", 
                    Itinerary = "Day 1-2: Colombo\nDay 3-4: Cultural Triangle\nDay 5-6: Kandy\nDay 7-8: Hill Country\nDay 9-11: Beach Stay\nDay 12: Departure",
                    IsFeatured = false,
                    DestinationId = 1,
                    Rating = 49,
                    ReviewCount = 22,
                    GalleryImages = new List<string> { 
                        "https://images.unsplash.com/photo-1581343109297-b0711eb85d7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                    }
                },
                new TourPackage { 
                    Title = "Romantic Honeymoon Escape", 
                    Description = "Begin your journey together with exclusive experiences, romantic dinners, and luxurious accommodations.", 
                    ShortDescription = "9-day romantic luxury honeymoon in Sri Lanka.",
                    ImageUrl = "/images/packages/romantic-honeymoon-escape-sri-lanka.jpg",
                    Price = 3299,
                    Duration = 9,
                    Inclusions = "Luxury suites and villas, Romantic candlelit dinners, Couple's spa treatments, Private excursions, Champagne", 
                    Itinerary = "Day 1: Arrival and luxury transfer\nDay 2-3: Cultural exploration\nDay 4-5: Tea country retreat\nDay 6-8: Private beach villa\nDay 9: Departure",
                    IsFeatured = true,
                    DestinationId = 2,
                    Rating = 50,
                    ReviewCount = 18,
                    GalleryImages = new List<string> { 
                        "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1592395630771-2c1f9fe29676?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
                        "https://images.unsplash.com/photo-1567105577638-5818f1fedd03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
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
                    Content = "Our trip to Sri Lanka exceeded all expectations. The attention to detail, private guides, and luxurious accommodations made it truly special. We'll cherish these memories forever.", 
                    Location = "London, UK",
                    ImageUrl = "/images/testimonials/",
                    Rating = 5,
                    PackageName = "Cultural Triangle Luxury Tour",
                    CreatedAt = DateTime.Now.AddMonths(-2)
                },
                new Testimonial { 
                    Name = "James & Emily Wilson", 
                    Content = "We've traveled extensively, but our journey through Sri Lanka with Best Sri Lanka Tours was one of the most memorable. The personalized service and insider access to hidden gems made all the difference.", 
                    Location = "Sydney, Australia",
                    ImageUrl = "/images/testimonials/",
                    Rating = 5,
                    PackageName = "Wildlife Safari Experience",
                    CreatedAt = DateTime.Now.AddMonths(-1)
                },
                new Testimonial { 
                    Name = "Michelle Thompson", 
                    Content = "The private beach villa arranged by Best Sri Lanka Tours was absolutely breathtaking. Our personal chef prepared the most amazing Sri Lankan cuisine, and the sunset views were unmatched.", 
                    Location = "Toronto, Canada",
                    ImageUrl = "/images/testimonials/",
                    Rating = 5,
                    PackageName = "Coastal Serenity Escape",
                    CreatedAt = DateTime.Now.AddDays(-20)
                },
                new Testimonial { 
                    Name = "David Chen", 
                    Content = "As avid tea lovers, the Hill Country Tea Trails tour was a dream come true. Staying in colonial-era tea planter bungalows and learning about the tea-making process directly from experts was incredible.", 
                    Location = "Hong Kong",
                    ImageUrl = "/images/testimonials/",
                    Rating = 5,
                    PackageName = "Hill Country Tea Trails",
                    CreatedAt = DateTime.Now.AddDays(-15)
                },
                new Testimonial { 
                    Name = "Alexandra & Robert Patel", 
                    Content = "Our honeymoon in Sri Lanka was pure magic. From candlelit dinners on the beach to private waterfall swims, every moment was curated to perfection. Truly an unforgettable start to our marriage.", 
                    Location = "New York, USA",
                    ImageUrl = "/images/testimonials/",
                    Rating = 5,
                    PackageName = "Romantic Honeymoon Escape",
                    CreatedAt = DateTime.Now.AddDays(-10)
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
        
        public Task<TourPackage> GetTourPackageBySlugAsync(string slug)
        {
            if (string.IsNullOrEmpty(slug))
            {
                return Task.FromResult<TourPackage>(null);
            }
            
            // Normalize the slug (lower case, trimmed)
            var normalizedSlug = slug.Trim().ToLowerInvariant();
            
            // If we don't have any slugs defined yet, generate them on the fly from titles
            foreach (var package in _tourPackages.Where(p => string.IsNullOrEmpty(p.Slug)))
            {
                var title = package.Title;
                if (!string.IsNullOrEmpty(title))
                {
                    // Convert to lowercase, replace spaces with hyphens, and remove special characters
                    var generatedSlug = System.Text.RegularExpressions.Regex.Replace(title.ToLower(), @"[^a-z0-9\s-]", "");
                    generatedSlug = System.Text.RegularExpressions.Regex.Replace(generatedSlug, @"\s+", "-");
                    // Remove multiple consecutive hyphens
                    generatedSlug = System.Text.RegularExpressions.Regex.Replace(generatedSlug, @"-+", "-");
                    // Trim hyphens from start and end
                    generatedSlug = generatedSlug.Trim('-');
                    
                    package.Slug = generatedSlug;
                }
            }
            
            return Task.FromResult(_tourPackages.FirstOrDefault(p => p.Slug != null && p.Slug.Equals(normalizedSlug, StringComparison.OrdinalIgnoreCase)));
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
                Rating = tourPackageDto.Rating,
                ReviewCount = tourPackageDto.ReviewCount,
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
                Featured = destinationDto.Featured,
                
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
                Rating = testimonialDto.Rating,
                PackageName = testimonialDto.PackageName,
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