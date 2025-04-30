import React, { useState } from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
import { Phone, Mail, Clock, Globe, MessageSquare, AlertCircle, FileText, Headphones, ChevronDown, Search } from 'lucide-react';

const SupportCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample FAQs organized by category
  const faqCategories = [
    {
      id: 'booking',
      title: 'Booking & Reservations',
      icon: <Calendar className="w-5 h-5" />,
      questions: [
        {
          question: 'How do I book a tour with Best Sri Lanka Tours?',
          answer: 'You can book a tour through our website by selecting your desired tour package and clicking the "Book Now" button. Alternatively, you can contact our travel consultants directly via email or phone for a customized booking experience.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For certain tours, we offer a deposit payment option with the balance due before your arrival.'
        },
        {
          question: 'Is my booking confirmed immediately?',
          answer: 'Once you submit your booking request, you will receive an acknowledgment email. Our team will then verify availability and send you a confirmation email within 24 hours with all the details of your booking.'
        },
        {
          question: 'Can I book additional activities during my tour?',
          answer: 'Yes, you can add optional activities either at the time of booking or during your tour. Your tour guide can help arrange additional activities based on availability.'
        }
      ]
    },
    {
      id: 'cancellation',
      title: 'Cancellation & Refunds',
      icon: <FileText className="w-5 h-5" />,
      questions: [
        {
          question: 'What is your cancellation policy?',
          answer: 'Our standard cancellation policy allows for a full refund if canceled 30 days or more before your tour start date. Cancellations between 15-29 days receive a 50% refund. Cancellations less than 15 days before the tour start date are non-refundable. Please refer to your booking confirmation for the specific policy that applies to your reservation.'
        },
        {
          question: 'How do I request a cancellation or change to my booking?',
          answer: 'To request a cancellation or make changes to your booking, please email us at support@bestsrilankatours.com with your booking reference number and details of the changes required.'
        },
        {
          question: 'Are there any fees for changing my tour dates?',
          answer: 'Date changes made 30 days or more before your tour start date are typically free of charge, subject to availability. Changes made less than 30 days before the start date may incur an administration fee.'
        },
        {
          question: 'What happens if Best Sri Lanka Tours cancels my tour?',
          answer: 'In the rare event that we need to cancel your tour due to unforeseen circumstances, you will be offered a full refund or the option to reschedule for a later date at no additional cost.'
        }
      ]
    },
    {
      id: 'travel',
      title: 'Travel Requirements',
      icon: <Globe className="w-5 h-5" />,
      questions: [
        {
          question: 'Do I need a visa to visit Sri Lanka?',
          answer: 'Most visitors to Sri Lanka require an Electronic Travel Authorization (ETA) or visa. You can apply for an ETA online through the official Sri Lankan government website. Requirements vary by nationality, so we recommend checking the latest visa information for your country.'
        },
        {
          question: 'What vaccinations are required for Sri Lanka?',
          answer: 'While there are no mandatory vaccinations for most travelers to Sri Lanka, we recommend consulting with your healthcare provider or a travel medicine specialist about recommended vaccinations such as Hepatitis A, Typhoid, and routine immunizations.'
        },
        {
          question: 'What travel insurance do you recommend?',
          answer: 'We strongly recommend comprehensive travel insurance that covers medical emergencies, trip cancellation, lost luggage, and personal liability. If you don\'t have a preferred provider, our team can suggest reliable travel insurance options.'
        },
        {
          question: 'Are there any COVID-19 travel requirements?',
          answer: 'COVID-19 travel requirements can change frequently. Please check the latest entry requirements on the official Sri Lankan government website before your trip. We will also provide updated information in your pre-departure package.'
        }
      ]
    },
    {
      id: 'tour',
      title: 'During Your Tour',
      icon: <Map className="w-5 h-5" />,
      questions: [
        {
          question: 'What happens if I encounter an issue during my tour?',
          answer: 'Your tour guide is your first point of contact for any issues during your tour. Additionally, all clients receive a 24/7 emergency contact number before departure. Our team is always ready to assist with any concerns that arise.'
        },
        {
          question: 'Can dietary restrictions be accommodated?',
          answer: 'Yes, we can accommodate most dietary requirements including vegetarian, vegan, gluten-free, and allergies. Please inform us of any dietary needs during the booking process so we can make appropriate arrangements.'
        },
        {
          question: 'What if I get sick during my tour?',
          answer: 'If you become ill during your tour, your guide will assist you in finding appropriate medical care. Sri Lanka has good medical facilities in major cities. We recommend having travel insurance that covers medical emergencies.'
        },
        {
          question: 'Can I request changes to my itinerary during the tour?',
          answer: 'With our private tours, we offer flexibility to make reasonable adjustments to your itinerary during the tour, subject to availability and any additional costs. Discuss any desired changes with your tour guide who will try to accommodate your requests.'
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery.trim() === '' 
    ? faqCategories 
    : faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(item => 
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  const handleCategoryToggle = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <StandardPageTemplate
      title="Support Center"
      description="Find answers to common questions and get assistance with your travel plans."
      breadcrumbs={[{ label: 'Help', path: '/help' }]}
    >
      {/* Contact Options */}
      <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#0077B6] hover:shadow-lg transition-shadow duration-300">
          <div className="bg-[#0077B6]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Phone className="text-[#0077B6] w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Speak directly with our customer support team for immediate assistance.</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-600" />
              <span>UK: +44 20 8123 4567</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-600" />
              <span>Sri Lanka: +94 11 234 5678</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-600" />
              <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#0077B6] hover:shadow-lg transition-shadow duration-300">
          <div className="bg-[#0077B6]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Mail className="text-[#0077B6] w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours.</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-600" />
              <span>General: info@bestsrilankatours.com</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-600" />
              <span>Support: support@bestsrilankatours.com</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-600" />
              <span>Response time: Within 24 hours</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#0077B6] hover:shadow-lg transition-shadow duration-300">
          <div className="bg-[#0077B6]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="text-[#0077B6] w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Chat with our support team in real-time for quick answers.</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-gray-600" />
              <span>Available on our website</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-600" />
              <span>Mon-Fri: 8:00 AM - 8:00 PM</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-600" />
              <span>Sat-Sun: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Search */}
      <div className="mb-12">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="relative max-w-xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6] transition duration-150 ease-in-out"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* FAQ Accordion */}
          {filteredFAQs.map((category) => (
            <div 
              key={category.id} 
              className={`mb-6 border border-gray-200 rounded-lg overflow-hidden ${category.questions.length === 0 ? 'hidden' : ''}`}
            >
              <div 
                className={`flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 ${activeCategory === category.id ? 'border-b border-gray-200' : ''}`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <div className="flex items-center">
                  <div className="bg-[#0077B6]/10 p-2 rounded-full mr-3">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{category.title}</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${activeCategory === category.id ? 'transform rotate-180' : ''}`} />
              </div>
              
              {activeCategory === category.id && (
                <div className="bg-white">
                  {category.questions.map((item, index) => (
                    <div 
                      key={index} 
                      className={`p-5 ${index !== category.questions.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-start">
                        <span className="text-[#0077B6] mr-2">Q:</span>
                        {item.question}
                      </h4>
                      <p className="text-gray-600 pl-6">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* No results message */}
          {searchQuery.trim() !== '' && filteredFAQs.every(category => category.questions.length === 0) && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No matching questions found</h3>
              <p className="text-gray-600">
                Try adjusting your search or <a href="/contact" className="text-[#0077B6] hover:underline">contact us</a> for personalized assistance.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Self-Service Options */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
          Self-Service Options
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 text-[#0077B6]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">Manage Your Booking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              View, modify, or cancel your bookings online through your account dashboard.
            </p>
            <a href="/my-bookings" className="text-[#0077B6] font-medium hover:underline flex items-center">
              Go to My Bookings
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 text-[#0077B6]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">Travel Resources</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Access our comprehensive travel guides, packing lists, and destination information.
            </p>
            <a href="/travel-resources" className="text-[#0077B6] font-medium hover:underline flex items-center">
              Browse Resources
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 text-[#0077B6]">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">Submit a Request</h3>
            </div>
            <p className="text-gray-600 mb-4">
              File a support ticket for specific issues or questions requiring detailed assistance.
            </p>
            <a href="/contact" className="text-[#0077B6] font-medium hover:underline flex items-center">
              Submit Request
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 text-[#0077B6]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">Travel Alerts</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Stay informed about weather events, travel advisories, or other important updates.
            </p>
            <a href="/safety-updates" className="text-[#0077B6] font-medium hover:underline flex items-center">
              View Alerts
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Emergency Contact */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-16">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-red-800">Emergency Contact</h3>
            <div className="mt-2 text-red-700">
              <p>For urgent assistance during your tour in Sri Lanka, please contact our 24/7 emergency line:</p>
              <p className="font-semibold mt-2">+94 77 123 4567</p>
              <p className="text-sm mt-1">
                Please use this number only for genuine emergencies while traveling with us in Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StandardPageTemplate>
  );
};

// Missing component definitions
const Calendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Map = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

export default SupportCenter;