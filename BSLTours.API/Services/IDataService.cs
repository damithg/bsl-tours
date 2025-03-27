using System.Collections.Generic;
using System.Threading.Tasks;
using BSLTours.API.Models;

namespace BSLTours.API.Services
{
    public interface IDataService
    {
        // Tour Packages
        Task<IEnumerable<TourPackage>> GetTourPackagesAsync();
        Task<IEnumerable<TourPackage>> GetFeaturedTourPackagesAsync();
        Task<TourPackage> GetTourPackageByIdAsync(int id);
        Task<TourPackage> GetTourPackageBySlugAsync(string slug);
        Task<TourPackage> CreateTourPackageAsync(CreateTourPackageDto tourPackageDto);
        
        // Destinations
        Task<IEnumerable<Destination>> GetDestinationsAsync();
        Task<Destination> GetDestinationByIdAsync(int id);
        Task<Destination> GetDestinationBySlugAsync(string slug);
        Task<Destination> CreateDestinationAsync(CreateDestinationDto destinationDto);
        
        // Testimonials
        Task<IEnumerable<Testimonial>> GetTestimonialsAsync();
        Task<Testimonial> CreateTestimonialAsync(CreateTestimonialDto testimonialDto);
        
        // Inquiries
        Task<IEnumerable<Inquiry>> GetInquiriesAsync();
        Task<Inquiry> CreateInquiryAsync(CreateInquiryDto inquiryDto);
        
        // Subscribers
        Task<Subscriber> GetSubscriberByEmailAsync(string email);
        Task<Subscriber> AddSubscriberAsync(CreateSubscriberDto subscriberDto);
    }
}