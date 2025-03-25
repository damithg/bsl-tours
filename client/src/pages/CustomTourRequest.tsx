import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { RouteDestination } from '../components/TravelRoutePlanner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface TourRequestFormData {
  fullName: string;
  email: string;
  phone: string;
  travelDates: string;
  numberOfTravelers: string;
  additionalNotes: string;
}

interface CustomTourRequestProps {
  route?: string;
}

const CustomTourRequest: React.FC<CustomTourRequestProps> = () => {
  const [formData, setFormData] = useState<TourRequestFormData>({
    fullName: '',
    email: '',
    phone: '',
    travelDates: '',
    numberOfTravelers: '2',
    additionalNotes: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Get the search params to extract serialized route information
  const searchParams = new URLSearchParams(window.location.search);
  const routeParam = searchParams.get('route');
  
  // Parse the route information from URL (if available)
  const routeDestinations: RouteDestination[] = React.useMemo(() => {
    if (!routeParam) return [];
    try {
      return JSON.parse(decodeURIComponent(routeParam));
    } catch (e) {
      console.error('Failed to parse route from URL:', e);
      return [];
    }
  }, [routeParam]);
  
  // Calculate total days
  const totalDays = React.useMemo(() => {
    return routeDestinations.reduce((sum, dest) => sum + (dest.days || 0), 0);
  }, [routeDestinations]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real application, we would send this data to the server
      // For now, let's simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Request Submitted Successfully",
        description: "Our travel experts will contact you soon to discuss your custom tour.",
      });
    } catch (error) {
      toast({
        title: "Error Submitting Request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If no route is provided, redirect to the travel planner
  if (routeDestinations.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">No Route Selected</h1>
          <p className="text-gray-600 mb-8">You need to create a travel route before requesting a custom tour.</p>
          <Button onClick={() => setLocation('/travel-planner')}>
            Create Your Route
          </Button>
        </div>
      </div>
    );
  }
  
  // If the form was successfully submitted, show a success message
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-12 bg-primary/5 rounded-lg border border-primary/10 mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Request Submitted Successfully!</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Thank you for your interest in our custom tour. Our travel experts will review your itinerary 
              and contact you within 24 hours to discuss the details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => setLocation('/')}>
                Return to Home
              </Button>
              <Button onClick={() => setLocation('/travel-planner')}>
                Plan Another Trip
              </Button>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Reference Number: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p>Submitted on: {format(new Date(), 'PPP')}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <h1 className="text-4xl font-bold text-center mb-2">Customize Your Tour</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Complete the form below to request your personalized {totalDays}-day Sri Lanka tour. 
        Our travel experts will contact you to finalize the details.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Left column: Route Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Your Selected Route</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Trip Summary</h3>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {totalDays} days
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>{routeDestinations.length} destinations</p>
                      <p>Customized itinerary</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Destinations</h3>
                    <ul className="space-y-3">
                      {routeDestinations.map((destination, index) => (
                        <li key={destination.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <p className="font-medium">{destination.name}</p>
                              <span className="text-sm text-primary">{destination.days} days</span>
                            </div>
                            {index < routeDestinations.length - 1 && (
                              <div className="text-xs text-gray-500 flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 19V5M5 12l7-7 7 7"/>
                                </svg>
                                Continue to {routeDestinations[index + 1].name}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-center pt-2">
                    <Button variant="outline" size="sm" onClick={() => setLocation('/travel-planner')}>
                      Modify Route
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right column: Contact Form */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="numberOfTravelers">Number of Travelers *</Label>
                    <Input 
                      id="numberOfTravelers"
                      name="numberOfTravelers"
                      type="number"
                      min="1"
                      value={formData.numberOfTravelers}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="travelDates">Preferred Travel Dates</Label>
                  <Input 
                    id="travelDates"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleInputChange}
                    placeholder="e.g., Apr 15-30, 2025 or Flexible"
                  />
                  <p className="text-xs text-gray-500">If your dates are flexible, please indicate your preferred month or season.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea 
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Any special requirements, accommodation preferences, or specific activities you'd like to include..."
                    rows={5}
                  />
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">What Happens Next?</h3>
                  <p className="text-sm text-gray-600">
                    Once you submit this form, our travel experts will review your request and contact you within 24 hours 
                    to discuss your itinerary, answer any questions, and provide a customized quote.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="min-w-32">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomTourRequest;