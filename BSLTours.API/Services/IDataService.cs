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
        Task<TourPackage> CreateTourPackageAsync(CreateTourPackageDto tourPackage);

        // Destinations
        Task<IEnumerable<Destination>> GetDestinationsAsync();
        Task<Destination> GetDestinationByIdAsync(int id);
        Task<Destination> CreateDestinationAsync(CreateDestinationDto destination);

        // Testimonials
        Task<IEnumerable<Testimonial>> GetTestimonialsAsync();
        Task<Testimonial> CreateTestimonialAsync(CreateTestimonialDto testimonial);

        // Inquiries
        Task<IEnumerable<Inquiry>> GetInquiriesAsync();
        Task<Inquiry> CreateInquiryAsync(CreateInquiryDto inquiry);

        // Subscribers
        Task<Subscriber> GetSubscriberByEmailAsync(string email);
        Task<Subscriber> AddSubscriberAsync(CreateSubscriberDto subscriber);
    }
}