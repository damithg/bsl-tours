using BSLTours.API.Models;

namespace BSLTours.API.Services
{
    public interface IDataService
    {
        // Tour Packages
        IEnumerable<TourPackage> GetTourPackages();
        IEnumerable<TourPackage> GetFeaturedTourPackages();
        TourPackage? GetTourPackageById(int id);
        TourPackage CreateTourPackage(TourPackage tourPackage);
        
        // Destinations
        IEnumerable<Destination> GetDestinations();
        Destination? GetDestinationById(int id);
        Destination CreateDestination(Destination destination);
        
        // Testimonials
        IEnumerable<Testimonial> GetTestimonials();
        Testimonial CreateTestimonial(Testimonial testimonial);
        
        // Inquiries
        Inquiry CreateInquiry(Inquiry inquiry);
        IEnumerable<Inquiry> GetInquiries();
        
        // Newsletter Subscribers
        Subscriber CreateSubscriber(Subscriber subscriber);
        Subscriber? GetSubscriberByEmail(string email);
    }
}