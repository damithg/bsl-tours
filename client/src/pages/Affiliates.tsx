import React from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
import {
  DollarSign,
  TrendingUp,
  Share2,
  Users,
  BarChart3,
  Globe,
  Headphones,
  FileText,
  ChevronRight,
  CheckCircle,
  Clock
} from 'lucide-react';

const Affiliates: React.FC = () => {
  // Affiliate program benefits
  const benefits = [
    {
      title: 'Competitive Commission',
      description: 'Earn up to 10% commission on all successful bookings made through your referrals.',
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      title: 'Real-Time Tracking',
      description: 'Access a user-friendly dashboard to track your referrals, conversions, and earnings.',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: 'Global Audience',
      description: 'Promote Sri Lanka as a destination to a worldwide audience of travelers.',
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: 'Marketing Resources',
      description: 'Get access to high-quality images, banners, and content to enhance your promotional efforts.',
      icon: <Share2 className="w-5 h-5" />
    },
    {
      title: 'Dedicated Support',
      description: 'Receive personalized assistance from our affiliate management team.',
      icon: <Headphones className="w-5 h-5" />
    },
    {
      title: 'Performance Bonuses',
      description: 'Unlock higher commission rates and special incentives as your referrals increase.',
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];
  
  // How it works steps
  const steps = [
    {
      title: 'Apply',
      description: 'Complete the affiliate application form. We\'ll review your website or platform to ensure it aligns with our brand.'
    },
    {
      title: 'Get Approved',
      description: 'Once approved, you\'ll receive access to your personalized affiliate dashboard and marketing materials.'
    },
    {
      title: 'Promote',
      description: 'Share your unique affiliate links across your platform, social media, or email newsletters.'
    },
    {
      title: 'Earn',
      description: 'Earn commissions on successful bookings made through your referrals, with payments processed monthly.'
    }
  ];
  
  // Ideal affiliate profiles
  const affiliateProfiles = [
    {
      title: 'Travel Bloggers & Influencers',
      description: 'If you create content about travel, especially focusing on Asian destinations, luxury experiences, or adventure tourism.',
      icon: <Users className="w-6 h-6 text-[#0077B6]" />
    },
    {
      title: 'Travel Agencies',
      description: 'Agencies looking to offer Sri Lankan experiences to their clients without handling the logistics themselves.',
      icon: <Globe className="w-6 h-6 text-[#0077B6]" />
    },
    {
      title: 'Content Creators',
      description: 'YouTubers, photographers, and social media personalities with an audience interested in travel and exploration.',
      icon: <Camera className="w-6 h-6 text-[#0077B6]" />
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: 'How do I apply for the affiliate program?',
      answer: 'You can apply by filling out the affiliate application form at the bottom of this page. Our team will review your application and get back to you within 2-3 business days.'
    },
    {
      question: 'What is the commission structure?',
      answer: 'Our standard commission rate is 7% for new affiliates. As you generate more bookings, you can qualify for our tiered commission structure with rates up to 10% for high-performing affiliates.'
    },
    {
      question: 'When and how will I get paid?',
      answer: 'Commissions are calculated at the end of each month and paid by the 15th of the following month. Payment methods include PayPal, bank transfer, or Wise, with a minimum payout threshold of $100.'
    },
    {
      question: 'What is the cookie duration?',
      answer: 'We offer a 60-day cookie duration, meaning you\'ll receive credit for bookings made within 60 days of a visitor clicking on your affiliate link.'
    },
    {
      question: 'Can I promote specific tours or destinations?',
      answer: 'Yes, you can create custom affiliate links for specific tours, destinations, or seasonal promotions. This allows you to tailor your marketing to your audience\'s interests.'
    },
    {
      question: 'What marketing materials are available?',
      answer: 'You\'ll have access to a variety of banners, high-quality destination images, pre-written content snippets, and detailed tour descriptions that you can use across your platforms.'
    }
  ];

  return (
    <StandardPageTemplate
      title="Affiliate Program"
      description="Partner with us to promote Sri Lanka's premier luxury tours and earn competitive commissions."
      breadcrumbs={[{ label: 'Partners', path: '/partners' }]}
    >
      {/* Introduction */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-['Playfair_Display']">
          Join Our Affiliate Program
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Best Sri Lanka Tours offers a rewarding affiliate program for travel enthusiasts, content creators, and businesses who want to share Sri Lanka's beauty with their audience while earning generous commissions.
        </p>
        
        <p className="text-lg text-gray-700 mb-6">
          By becoming an affiliate, you'll partner with Sri Lanka's leading luxury tour operator and gain access to professional marketing materials, competitive commission rates, and dedicated support to maximize your earnings.
        </p>
        
        <div className="bg-[#0077B6]/10 p-6 rounded-lg border-l-4 border-[#0077B6]">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Partner With Us?</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#0077B6] mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Premium, authentic Sri Lankan experiences to promote</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#0077B6] mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Established brand with excellent customer reviews</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#0077B6] mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">High average booking value, leading to higher commissions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#0077B6] mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Transparent tracking and reliable monthly payments</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Benefits */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
          Affiliate Benefits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={`benefit-${index}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-[#0077B6]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-[#0077B6]">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
          How It Works
        </h2>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-4 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#0077B6] to-[#0077B6]/30 hidden md:block"></div>
          
          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={`step-${index}`} className="flex items-start">
                <div className="relative">
                  <div className="bg-[#0077B6] text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-6 z-10 relative">
                    {index + 1}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Ideal for */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-['Playfair_Display']">
          Ideal For
        </h2>
        
        <p className="text-lg text-gray-700 mb-8">
          Our affiliate program is designed for partners who share our passion for authentic travel experiences and have an engaged audience interested in exploring Sri Lanka.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {affiliateProfiles.map((profile, index) => (
            <div 
              key={`profile-${index}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-[#0077B6]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {profile.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{profile.title}</h3>
              <p className="text-gray-600">{profile.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Commission Structure */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-['Playfair_Display']">
          Commission Structure
        </h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tiered Commission Rates</h3>
            <p className="text-gray-700 mb-6">
              Our tiered commission structure rewards your performance. As you generate more bookings, you'll unlock higher commission rates.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Bookings
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Standard</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">1-5</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">7%</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Silver</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">6-10</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">8%</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Gold</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">11-20</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">9%</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Platinum</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">21+</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">10%</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-5 h-5 text-[#0077B6] mr-2" />
                  <h4 className="font-semibold text-gray-800">Minimum Payout</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  $100 USD equivalent in your chosen currency
                </p>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-[#0077B6] mr-2" />
                  <h4 className="font-semibold text-gray-800">Payment Schedule</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Monthly (by the 15th of the following month)
                </p>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 text-[#0077B6] mr-2" />
                  <h4 className="font-semibold text-gray-800">Payment Methods</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  PayPal, Bank Transfer, Wise
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
          Frequently Asked Questions
        </h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
      
      {/* Application Form */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
          Apply to Become an Affiliate
        </h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  placeholder="Your full name"
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
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website/Blog URL *
                </label>
                <input
                  type="url"
                  id="website"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="social" className="block text-sm font-medium text-gray-700 mb-1">
                  Social Media Profiles
                </label>
                <input
                  type="text"
                  id="social"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  placeholder="Instagram: @username, YouTube: channel name, etc."
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">
                Audience Size & Demographics *
              </label>
              <textarea
                id="audience"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                placeholder="Describe your audience size, demographics, and interests"
                rows={3}
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="promotion" className="block text-sm font-medium text-gray-700 mb-1">
                How Will You Promote Best Sri Lanka Tours? *
              </label>
              <textarea
                id="promotion"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                placeholder="Describe your promotion strategy and platforms"
                rows={3}
                required
              ></textarea>
            </div>
            
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-2"
                  required
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-[#0077B6] hover:underline">terms and conditions</a> of the Best Sri Lanka Tours Affiliate Program.
                </span>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300"
              >
                Submit Application
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </StandardPageTemplate>
  );
};

// Missing component definition
const Camera = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

export default Affiliates;