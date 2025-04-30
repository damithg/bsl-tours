import React from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
import { 
  Star, 
  Gift, 
  Award, 
  Percent, 
  Clock, 
  Calendar, 
  Users, 
  Crown, 
  Check, 
  ChevronRight, 
  Mail 
} from 'lucide-react';

const BSLClub: React.FC = () => {
  // Membership benefits by tier
  const membershipTiers = [
    {
      name: 'Gold',
      price: '$99',
      period: 'per year',
      icon: <Star className="w-8 h-8 text-amber-500" />,
      color: 'amber',
      benefits: [
        'Priority booking on all tours',
        '5% discount on all standard tours',
        'Exclusive monthly newsletter with travel tips',
        'Special birthday surprise when traveling on your birthday',
        'Dedicated customer support line'
      ],
      features: [
        {
          title: 'Discounts',
          value: '5% on standard tours'
        },
        {
          title: 'Priority booking',
          value: 'Yes'
        },
        {
          title: 'Exclusive events',
          value: 'No'
        },
        {
          title: 'Free upgrades',
          value: 'No'
        }
      ]
    },
    {
      name: 'Platinum',
      price: '$199',
      period: 'per year',
      icon: <Crown className="w-8 h-8 text-slate-700" />,
      color: 'slate',
      featured: true,
      benefits: [
        'All Gold benefits',
        '10% discount on all tours',
        'Free upgrade to premium accommodation (when available)',
        'Exclusive access to members-only events and experiences',
        'Complimentary airport lounge access before departure',
        'Early access to new tours and seasonal promotions'
      ],
      features: [
        {
          title: 'Discounts',
          value: '10% on all tours'
        },
        {
          title: 'Priority booking',
          value: 'Yes'
        },
        {
          title: 'Exclusive events',
          value: 'Yes'
        },
        {
          title: 'Free upgrades',
          value: 'Yes (subject to availability)'
        }
      ]
    },
    {
      name: 'Diamond',
      price: '$399',
      period: 'per year',
      icon: <Award className="w-8 h-8 text-sky-500" />,
      color: 'sky',
      benefits: [
        'All Platinum benefits',
        '15% discount on all tours',
        'Guaranteed premium accommodation upgrades',
        'Personalized travel consultation with our senior planners',
        'Complimentary luxury transportation for airport transfers',
        'Annual member appreciation gift from Sri Lanka',
        'Exclusive Diamond member events and networking opportunities'
      ],
      features: [
        {
          title: 'Discounts',
          value: '15% on all tours'
        },
        {
          title: 'Priority booking',
          value: 'Yes, with personal concierge'
        },
        {
          title: 'Exclusive events',
          value: 'Yes, with VIP access'
        },
        {
          title: 'Free upgrades',
          value: 'Guaranteed for accommodations'
        }
      ]
    }
  ];
  
  // Testimonials from club members
  const testimonials = [
    {
      quote: "The BSL Club membership paid for itself on our first trip! The room upgrade and airport transfer alone were worth it, not to mention the fantastic cultural dinner we were invited to as members.",
      author: "Sarah & Michael Thompson",
      location: "London, UK",
      tier: "Platinum Member"
    },
    {
      quote: "As frequent travelers to Sri Lanka, the Diamond membership has enhanced our experiences tremendously. The personalized service and exclusive access to unique cultural events have made each visit special.",
      author: "James Wilson",
      location: "Sydney, Australia",
      tier: "Diamond Member"
    },
    {
      quote: "The monthly newsletters and early access to seasonal tours have helped us plan our trips perfectly. The 5% discount is a nice bonus too!",
      author: "Emma Rodriguez",
      location: "Toronto, Canada",
      tier: "Gold Member"
    }
  ];
  
  // Exclusive member events
  const exclusiveEvents = [
    {
      title: "Private Tea Tasting with Master Blenders",
      description: "An intimate gathering at a historic tea plantation with rare tea sampling and insights from expert blenders.",
      date: "June 2025",
      location: "Nuwara Eliya",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/events/tea-tasting.jpg"
    },
    {
      title: "Traditional Cooking Workshop with Local Chefs",
      description: "Learn authentic Sri Lankan recipes and techniques in a hands-on cooking session with celebrated local chefs.",
      date: "August 2025",
      location: "Colombo",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/events/cooking-workshop.jpg"
    },
    {
      title: "Exclusive Whale Watching Expedition",
      description: "A private chartered boat with marine biologists for an intimate whale and dolphin watching experience.",
      date: "December 2025",
      location: "Mirissa",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/events/whale-watching.jpg"
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: "How do I sign up for BSL Club membership?",
      answer: "You can sign up for BSL Club membership by filling out the application form at the bottom of this page. Once submitted, our team will process your application and send you membership details within 24-48 hours."
    },
    {
      question: "When do the membership benefits begin?",
      answer: "Your membership benefits begin immediately upon confirmation of your payment. You'll receive a digital membership card and welcome package by email, with instructions on how to access all your benefits."
    },
    {
      question: "Can I upgrade my membership tier later?",
      answer: "Yes, you can upgrade your membership tier at any time. When upgrading, we'll prorate the cost based on the remaining time in your current membership period."
    },
    {
      question: "Are the discounts applicable to already discounted tours or special promotions?",
      answer: "Member discounts are typically applied to regular tour prices. For already discounted tours or special promotions, we'll apply whichever discount is greater, ensuring you always get the best possible price."
    },
    {
      question: "How do I access exclusive member events?",
      answer: "Information about exclusive events is shared through the member portal and monthly newsletters. Platinum and Diamond members receive priority registration for all events."
    },
    {
      question: "Is the membership refundable if I change my mind?",
      answer: "We offer a 30-day money-back guarantee if you're not satisfied with your membership. After 30 days, memberships are non-refundable but can be transferred to another person once per membership year."
    }
  ];

  return (
    <StandardPageTemplate
      title="BSL Club"
      description="Join our exclusive membership program for premium benefits and unique Sri Lankan experiences."
      breadcrumbs={[]}
    >
      {/* Introduction */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">
              Welcome to the Best Sri Lanka Tours Club
            </h2>
            <p className="text-lg text-gray-700">
              An exclusive membership program offering premium benefits, unique experiences, and significant savings for passionate Sri Lanka travelers.
            </p>
          </div>
          <img 
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_200,h_200,c_fill/v1634567890/logos/bsl-club-emblem.png" 
            alt="BSL Club Emblem" 
            className="w-32 h-32 object-contain"
          />
        </div>
        
        <div className="bg-gradient-to-r from-[#0077B6]/10 to-[#0077B6]/5 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Experience Sri Lanka Like Never Before</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
                <Percent className="w-8 h-8 text-[#0077B6]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Exclusive Discounts</h4>
              <p className="text-gray-600">
                Save up to 15% on all tours and experiences with our tiered discount structure.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
                <Gift className="w-8 h-8 text-[#0077B6]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Premium Upgrades</h4>
              <p className="text-gray-600">
                Enjoy accommodation upgrades, priority services, and special amenities during your travels.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
                <Users className="w-8 h-8 text-[#0077B6]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Exclusive Events</h4>
              <p className="text-gray-600">
                Access to member-only events, cultural experiences, and networking opportunities.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <a 
              href="#join-now" 
              className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Join BSL Club Today
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Membership Tiers */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display'] text-center">
          Membership Options
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipTiers.map((tier, index) => (
            <div 
              key={`tier-${index}`}
              className={`relative rounded-lg overflow-hidden ${
                tier.featured 
                  ? 'border-2 border-[#0077B6] shadow-lg transform md:scale-105 bg-white' 
                  : 'border border-gray-200 shadow-sm bg-white'
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 inset-x-0 py-2 bg-[#0077B6] text-white text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-6 ${tier.featured ? 'pt-12' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-2xl font-bold text-${tier.color}-600`}>{tier.name}</h3>
                  {tier.icon}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 ml-1">{tier.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={`benefit-${index}-${benefitIndex}`} className="flex items-start">
                      <div className={`p-1 rounded-full bg-${tier.color}-100 text-${tier.color}-600 mr-2 mt-1`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
                  <dl className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={`feature-${index}-${featureIndex}`} className="flex justify-between">
                        <dt className="text-gray-500">{feature.title}</dt>
                        <dd className="text-gray-900 font-medium">{feature.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                
                <div className="mt-6">
                  <a 
                    href="#join-now" 
                    className={`block w-full text-center py-3 px-4 rounded-md font-medium ${
                      tier.featured 
                        ? 'bg-[#0077B6] text-white hover:bg-[#0077B6]/90' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors duration-300`}
                  >
                    {tier.featured ? 'Join Now' : 'Select Plan'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            All memberships are billed annually. Membership benefits are subject to availability and terms & conditions apply.
          </p>
        </div>
      </div>
      
      {/* Member Testimonials */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <Star className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Member Testimonials
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={`testimonial-${index}`}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400" fill="#fbbf24" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
                <p className="text-[#0077B6] text-sm mt-1">{testimonial.tier}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Exclusive Events */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <Calendar className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Exclusive Member Events
          </h2>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          Platinum and Diamond members gain access to exclusive events and experiences that showcase the authentic culture, cuisine, and natural beauty of Sri Lanka.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exclusiveEvents.map((event, index) => (
            <div 
              key={`event-${index}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800 text-lg">{event.title}</h3>
                  <div className="bg-[#0077B6]/10 px-2 py-1 rounded text-xs text-[#0077B6] font-medium">
                    Member Exclusive
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
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
          {faqItems.map((item, index) => (
            <div 
              key={`faq-${index}`}
              className={`p-6 ${index !== faqItems.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Membership Application */}
      <div id="join-now">
        <div className="flex items-center mb-8">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <Users className="w-6 h-6 text-[#0077B6]" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
            Join BSL Club
          </h2>
        </div>
        
        <div className="bg-gradient-to-r from-[#0077B6] to-[#004E64] rounded-lg overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Apply for Membership
                </h3>
                <p className="text-white/80">
                  Fill out the form below to apply for BSL Club membership. Our team will review your application and contact you within 24-48 hours.
                </p>
              </div>
              
              <form className="bg-white rounded-lg p-6 md:p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      required
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
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="membershipTier" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Membership Tier *
                    </label>
                    <select
                      id="membershipTier"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      required
                    >
                      <option value="">Select a tier</option>
                      <option value="gold">Gold ($99/year)</option>
                      <option value="platinum">Platinum ($199/year)</option>
                      <option value="diamond">Diamond ($399/year)</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="travelInterests" className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Interests (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Cultural Experiences</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Wildlife & Nature</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Beach & Relaxation</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Culinary Experiences</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Adventure Activities</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-700">Wellness & Ayurveda</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="visitedBefore" className="block text-sm font-medium text-gray-700 mb-1">
                    Have you visited Sri Lanka before?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="visitedBefore" value="yes" className="mr-2" />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="visitedBefore" value="no" className="mr-2" />
                      <span className="text-gray-700">No</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Why would you like to join BSL Club? (Optional)
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-2"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-[#0077B6] hover:underline">terms and conditions</a> and <a href="/privacy" className="text-[#0077B6] hover:underline">privacy policy</a> of Best Sri Lanka Tours.
                    </span>
                  </label>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      I would like to receive newsletters and promotional emails from Best Sri Lanka Tours.
                    </span>
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 w-full justify-center"
                  >
                    <Mail className="w-5 h-5" />
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </StandardPageTemplate>
  );
};

export default BSLClub;