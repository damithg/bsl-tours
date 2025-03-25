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
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { DateRange } from 'react-day-picker';

interface TourRequestFormData {
  fullName: string;
  email: string;
  phone: string;
  numberOfTravelers: string;
  additionalNotes: string;
}

interface CustomTourRequestProps {
  params?: { [param: string]: string | undefined };
}

const CustomTourRequest: React.FC<CustomTourRequestProps> = () => {
  // Date range state
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  // State for transportation modal
  const [transportDialog, setTransportDialog] = useState(false);
  
  const [formData, setFormData] = useState<TourRequestFormData>({
    fullName: '',
    email: '',
    phone: '',
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
      // Prepare the complete form data including the date range
      const completeFormData = {
        ...formData,
        dateRange: {
          from: date?.from ? format(date.from, 'yyyy-MM-dd') : undefined,
          to: date?.to ? format(date.to, 'yyyy-MM-dd') : undefined
        },
        selectedRoute: routeDestinations.map(dest => ({
          destination: dest.name,
          days: dest.days
        })),
        totalDays
      };
      
      console.log('Submitting form data:', completeFormData);
      
      // Simulate API call
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
  
  // If the form was successfully submitted, show a success message with upsell opportunities
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Success message */}
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
            <div className="text-center text-sm text-gray-500 mb-4">
              <p>Reference Number: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p>Submitted on: {format(new Date(), 'PPP')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => setLocation('/')}>
                Return to Home
              </Button>
              <Button onClick={() => setLocation('/travel-planner')}>
                Plan Another Trip
              </Button>
            </div>
          </div>
          
          {/* Upsell section title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Enhance Your Sri Lanka Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              While we prepare your custom itinerary, consider these additional options to make your journey even more memorable.
            </p>
          </div>
          
          {/* Upsell cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Premium Experiences */}
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1470043201067-764120126eb4?q=80&w=1000" 
                  alt="Luxury Experiences" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">Premium Experiences</h3>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Private helicopter tours over scenic landscapes
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Exclusive cultural performances
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Fine dining experiences with local chefs
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => setLocation('/contact')}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            {/* Luxury Transfers */}
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571366343168-631c5bcca7a4?q=80&w=1000" 
                  alt="Luxury Transfers" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">Luxury Transportation</h3>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    VIP airport transfers & meet and greet service
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Luxury vehicle with dedicated chauffeur
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Scenic train journeys in first-class cabins
                  </li>
                </ul>
                <Dialog open={transportDialog} onOpenChange={setTransportDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => setTransportDialog(true)}>
                      Add to Your Trip
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[620px]">
                    <DialogHeader>
                      <DialogTitle>Customize Your Transportation</DialogTitle>
                      <DialogDescription>
                        Select from our premium transportation options to enhance your Sri Lankan journey.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4 space-y-6">
                      {/* Transportation type selection */}
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-type">Select Vehicle Type</Label>
                        <RadioGroup defaultValue="luxury-sedan" className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                          <div className="flex flex-col items-center space-y-2 border rounded-lg p-3 cursor-pointer hover:border-primary relative">
                            <RadioGroupItem value="luxury-sedan" id="luxury-sedan" className="absolute top-2 right-2" />
                            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&q=80" className="w-full h-24 object-cover rounded-md" alt="Luxury Sedan" />
                            <Label htmlFor="luxury-sedan" className="text-sm font-medium">Luxury Sedan</Label>
                            <p className="text-xs text-gray-500 text-center">Perfect for couples or solo travelers</p>
                            <p className="text-primary font-medium text-sm">$75 per day</p>
                          </div>
                          
                          <div className="flex flex-col items-center space-y-2 border rounded-lg p-3 cursor-pointer hover:border-primary relative">
                            <RadioGroupItem value="premium-suv" id="premium-suv" className="absolute top-2 right-2" />
                            <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&q=80" className="w-full h-24 object-cover rounded-md" alt="Premium SUV" />
                            <Label htmlFor="premium-suv" className="text-sm font-medium">Premium SUV</Label>
                            <p className="text-xs text-gray-500 text-center">Ideal for small families (up to 4)</p>
                            <p className="text-primary font-medium text-sm">$95 per day</p>
                          </div>
                          
                          <div className="flex flex-col items-center space-y-2 border rounded-lg p-3 cursor-pointer hover:border-primary relative">
                            <RadioGroupItem value="luxury-van" id="luxury-van" className="absolute top-2 right-2" />
                            <img src="https://images.unsplash.com/photo-1626057993460-a5b3c0094903?w=400&h=300&q=80" className="w-full h-24 object-cover rounded-md" alt="Luxury Van" />
                            <Label htmlFor="luxury-van" className="text-sm font-medium">Luxury Van</Label>
                            <p className="text-xs text-gray-500 text-center">Spacious comfort for groups (up to 7)</p>
                            <p className="text-primary font-medium text-sm">$120 per day</p>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Service type options */}
                      <div className="space-y-3">
                        <Label>Service Options</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start space-x-3 border rounded-lg p-3 cursor-pointer hover:border-primary">
                            <Checkbox id="airport-transfer" />
                            <div>
                              <Label htmlFor="airport-transfer" className="text-sm font-medium">Airport VIP Transfer</Label>
                              <p className="text-xs text-gray-500">Meet & greet service with welcome amenities</p>
                              <p className="text-primary font-medium text-sm">$60 one-way</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 border rounded-lg p-3 cursor-pointer hover:border-primary">
                            <Checkbox id="full-day-driver" />
                            <div>
                              <Label htmlFor="full-day-driver" className="text-sm font-medium">Dedicated Chauffeur</Label>
                              <p className="text-xs text-gray-500">Full-day service with experienced local driver</p>
                              <p className="text-primary font-medium text-sm">$45 per day</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 border rounded-lg p-3 cursor-pointer hover:border-primary">
                            <Checkbox id="train-journey" />
                            <div>
                              <Label htmlFor="train-journey" className="text-sm font-medium">Scenic Train Journey</Label>
                              <p className="text-xs text-gray-500">First-class cabin on famous mountain route</p>
                              <p className="text-primary font-medium text-sm">$120 per person</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 border rounded-lg p-3 cursor-pointer hover:border-primary">
                            <Checkbox id="city-driver" />
                            <div>
                              <Label htmlFor="city-driver" className="text-sm font-medium">City Tour Driver</Label>
                              <p className="text-xs text-gray-500">Half-day city exploration with knowledgeable driver</p>
                              <p className="text-primary font-medium text-sm">$30 per city</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Special requests */}
                      <div className="space-y-2">
                        <Label htmlFor="special-requests">Special Requests</Label>
                        <Textarea 
                          id="special-requests" 
                          placeholder="Child seats, specific pickup times, preferred vehicle brands, etc."
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      {/* Total estimate */}
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-semibold">Estimated Total</h4>
                          <span className="text-lg font-bold text-primary">$375</span>
                        </div>
                        <p className="text-xs text-gray-500">Final price will be confirmed by your travel consultant</p>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          // Close the dialog
                          setTransportDialog(false);
                          
                          // Show success toast
                          toast({
                            title: "Transportation preferences saved",
                            description: "We've added your selections to your custom tour request.",
                          });
                        }}
                        className="w-full sm:w-auto"
                      >
                        Add to My Trip
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
            {/* Travel Insurance */}
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579621970590-9d624316904b?q=80&w=1000" 
                  alt="Travel Insurance" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">Premium Travel Insurance</h3>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Comprehensive medical coverage abroad
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Trip cancellation protection
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 global assistance services
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => setLocation('/contact')}>
                  Get Protected
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Related tour packages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Popular Tour Packages You Might Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Package 1 */}
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full z-10">
                    Bestseller
                  </div>
                  <img 
                    src="/images/tour-packages/cultural-tour.jpg" 
                    alt="Cultural Tour" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Cultural Heritage Tour</h3>
                    <span className="text-primary font-medium">$1,299</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    7 Days
                    <span className="mx-2">•</span>
                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Cultural Triangle
                  </div>
                  <Button variant="default" className="w-full" onClick={() => setLocation('/packages/cultural-heritage')}>
                    View Package
                  </Button>
                </CardContent>
              </Card>
              
              {/* Package 2 */}
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full z-10">
                    Popular
                  </div>
                  <img 
                    src="/images/tour-packages/wildlife-tour.jpg" 
                    alt="Wildlife Safari" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Wildlife Safari Adventure</h3>
                    <span className="text-primary font-medium">$1,499</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    8 Days
                    <span className="mx-2">•</span>
                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    National Parks
                  </div>
                  <Button variant="default" className="w-full" onClick={() => setLocation('/packages/wildlife-safari')}>
                    View Package
                  </Button>
                </CardContent>
              </Card>
              
              {/* Package 3 */}
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full z-10">
                    New
                  </div>
                  <img 
                    src="/images/tour-packages/beach-tour.jpg" 
                    alt="Beach Retreat" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Tropical Beach Retreat</h3>
                    <span className="text-primary font-medium">$1,199</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    6 Days
                    <span className="mx-2">•</span>
                    <svg className="w-4 h-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    South Coast
                  </div>
                  <Button variant="default" className="w-full" onClick={() => setLocation('/packages/beach-retreat')}>
                    View Package
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Newsletter signup */}
          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-3">Stay Updated on Special Offers</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive travel deals, seasonal promotions, and insider tips for your Sri Lanka journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow"
              />
              <Button>
                Subscribe
              </Button>
            </div>
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
                  <div className="grid gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${!date?.from && "text-muted-foreground"}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                            <line x1="16" x2="16" y1="2" y2="6"></line>
                            <line x1="8" x2="8" y1="2" y2="6"></line>
                            <line x1="3" x2="21" y1="10" y2="10"></line>
                          </svg>
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, yyyy")} - {format(date.to, "LLL dd, yyyy")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, yyyy")
                            )
                          ) : (
                            <span>Select your travel dates</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                          fromDate={new Date()}
                          toDate={addDays(new Date(), 900)} // About 2.5 years into the future
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-xs text-gray-500">If your dates are flexible, you can mention this in the notes section below.</p>
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