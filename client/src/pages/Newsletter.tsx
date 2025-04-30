import React, { useState } from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
import { 
  Mail, 
  Send, 
  BookOpen, 
  Sun, 
  Calendar, 
  Tag, 
  Bell, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitted, setSubmitted] = useState(false);
  
  const newsletterBenefits = [
    {
      title: "Exclusive Travel Deals",
      description: "Be the first to know about limited-time offers, seasonal promotions, and member-only discounts.",
      icon: <Tag className="w-6 h-6 text-[#0077B6]" />
    },
    {
      title: "Destination Insights",
      description: "Discover Sri Lanka's hidden gems, cultural festivals, and insider tips from our travel experts.",
      icon: <BookOpen className="w-6 h-6 text-[#0077B6]" />
    },
    {
      title: "Seasonal Updates",
      description: "Get timely information about the best times to visit different regions based on weather patterns.",
      icon: <Sun className="w-6 h-6 text-[#0077B6]" />
    },
    {
      title: "New Tour Announcements",
      description: "Be among the first to learn about our newest tour packages and special experiences.",
      icon: <Bell className="w-6 h-6 text-[#0077B6]" />
    }
  ];
  
  const previousEditions = [
    {
      month: "April 2025",
      title: "Beach Season Highlights: Sri Lanka's Coastal Treasures",
      excerpt: "Discover the perfect beaches for your summer getaway, from the golden sands of Bentota to the secluded coves of Tangalle.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_225,c_fill/v1634567890/newsletter/beaches-april.jpg"
    },
    {
      month: "March 2025",
      title: "Cultural Festivals: Celebrating Avurudu in Sri Lanka",
      excerpt: "Learn about the traditions and celebrations of Sri Lankan New Year, with special tour opportunities to experience the festivities.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_225,c_fill/v1634567890/newsletter/cultural-march.jpg"
    },
    {
      month: "February 2025",
      title: "Wildlife Encounters: Safari Season in Yala National Park",
      excerpt: "Explore the optimal times for wildlife viewing, spotting leopards, elephants, and exotic birds in their natural habitats.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_225,c_fill/v1634567890/newsletter/wildlife-february.jpg"
    }
  ];
  
  const interestOptions = [
    "Cultural Experiences",
    "Beach Getaways",
    "Wildlife & Nature",
    "Wellness & Ayurveda",
    "Adventure Activities",
    "Luxury Travel",
    "Family-Friendly Tours",
    "Culinary Experiences"
  ];
  
  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, this would be an actual API call to subscribe the user
      setSubmitStatus('success');
      setSubmitted(true);
      
      // Reset form in a real application if needed
      // setEmail('');
      // setName('');
      // setInterests([]);
    }, 1500);
  };

  return (
    <StandardPageTemplate
      title="Newsletter"
      description="Stay updated with the latest travel news, exclusive offers, and destination insights from Best Sri Lanka Tours."
      breadcrumbs={[]}
      showContactCTA={false}
    >
      {/* Introduction */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">
              Join Our Travel Inspiration Newsletter
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Subscribe to our monthly newsletter and be inspired by the beauty, culture, and adventures of Sri Lanka. Receive exclusive offers, travel tips, and insider knowledge directly to your inbox.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-[#0077B6] mr-2" />
                <span className="text-gray-700">Monthly Editions</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-[#0077B6] mr-2" />
                <span className="text-gray-700">Curated Content</span>
              </div>
              <div className="flex items-center">
                <Send className="w-5 h-5 text-[#0077B6] mr-2" />
                <span className="text-gray-700">No Spam, Ever</span>
              </div>
            </div>
            <div className="bg-[#0077B6]/10 p-4 rounded-lg">
              <p className="text-gray-700 text-sm italic">
                "Our newsletter has been designed to provide real value to travelers interested in Sri Lanka. We focus on quality content, insider tips, and timely information to enhance your travel planning."
              </p>
              <p className="text-gray-800 font-semibold mt-2">— Damith Gunawardena, Founder</p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/v1634567890/newsletter/newsletter-mockup.jpg" 
              alt="Newsletter Preview" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Newsletter Benefits */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display'] text-center">
          Why Subscribe to Our Newsletter?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsletterBenefits.map((benefit, index) => (
            <div 
              key={`benefit-${index}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-[#0077B6]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Previous Editions */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <BookOpen className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Previous Editions
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previousEditions.map((edition, index) => (
            <div 
              key={`edition-${index}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={edition.imageUrl} 
                  alt={edition.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-[#0077B6] text-white px-3 py-1 text-sm font-medium">
                  {edition.month}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{edition.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{edition.excerpt}</p>
                <a 
                  href="#" 
                  className="text-[#0077B6] font-medium hover:underline flex items-center"
                >
                  Read Full Edition
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subscription Form */}
      <div id="subscribe" className="mb-16">
        <div className="bg-gradient-to-r from-[#0077B6] to-[#004E64] rounded-lg overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Mail className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {submitted ? 'Thank You for Subscribing!' : 'Subscribe to Our Newsletter'}
                </h3>
                <p className="text-white/80">
                  {submitted 
                    ? 'You\'ve successfully subscribed to our newsletter. You\'ll receive your first edition soon!'
                    : 'Fill out the form below to receive monthly travel inspirations, exclusive offers, and insider tips for Sri Lanka.'}
                </p>
              </div>
              
              {submitted ? (
                <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Subscription Confirmed!</h4>
                  <p className="text-gray-600 mb-6">
                    We've added <strong>{email}</strong> to our newsletter subscriber list. You'll start receiving our monthly newsletter with travel tips, exclusive deals, and Sri Lankan travel inspiration.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h5 className="font-semibold text-gray-800 mb-2">What's Next?</h5>
                    <ul className="text-gray-600 text-left space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Check your inbox for a welcome email from us</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Add newsletter@bestsrilankatours.com to your contacts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Expect your first newsletter edition in the coming weeks</span>
                      </li>
                    </ul>
                  </div>
                  <a 
                    href="/" 
                    className="inline-flex items-center bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Return to Homepage
                  </a>
                </div>
              ) : (
                <form className="bg-white rounded-lg p-6 md:p-8 shadow-lg" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                        placeholder="Your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Interests (Optional)
                    </label>
                    <p className="text-gray-500 text-sm mb-3">
                      Select the topics you're most interested in to receive personalized content.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="mr-2"
                            checked={interests.includes(interest)}
                            onChange={() => handleInterestToggle(interest)}
                          />
                          <span className="text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 mr-2"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to receive email newsletters from Best Sri Lanka Tours. I understand I can unsubscribe at any time. View our <a href="/privacy" className="text-[#0077B6] hover:underline">privacy policy</a>.
                      </span>
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 w-full justify-center"
                      disabled={submitStatus === 'loading'}
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Subscribe Now
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-white/70 text-sm">
                  We respect your privacy. You can unsubscribe at any time with a single click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div>
        <div className="flex items-center mb-8">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#0077B6]">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How often will I receive the newsletter?</h3>
            <p className="text-gray-600">
              Our newsletter is sent once a month, typically in the first week. Occasionally, we may send special editions for major announcements or limited-time offers.
            </p>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What type of content is included in the newsletter?</h3>
            <p className="text-gray-600">
              Each edition includes seasonal travel recommendations, insider tips, exclusive offers, new tour announcements, cultural insights, and practical travel information about Sri Lanka.
            </p>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I access past editions of the newsletter?</h3>
            <p className="text-gray-600">
              Yes, subscribers can access our newsletter archive through a link provided in each newsletter. This gives you access to all previous editions.
            </p>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I unsubscribe if I no longer want to receive the newsletter?</h3>
            <p className="text-gray-600">
              Every newsletter includes an unsubscribe link at the bottom. Simply click this link and follow the instructions to unsubscribe. Your request will be processed immediately.
            </p>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Are the exclusive offers in the newsletter available elsewhere?</h3>
            <p className="text-gray-600">
              Many of our special promotions and offers are exclusive to newsletter subscribers and won't be available on our website or through other channels.
            </p>
          </div>
        </div>
      </div>
    </StandardPageTemplate>
  );
};

export default Newsletter;