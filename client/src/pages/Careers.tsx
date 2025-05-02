import React from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
import { Mail, MapPin, BriefcaseBusiness } from 'lucide-react';

const Careers: React.FC = () => {
  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: 'Senior Tour Guide',
      location: 'Colombo, Sri Lanka',
      type: 'Full-time',
      description: 'Looking for an experienced tour guide with extensive knowledge of Sri Lankan culture, history, and attractions to lead luxury private tours.',
      requirements: [
        'Minimum 3 years of experience as a tour guide',
        'Excellent communication skills in English (additional languages are a plus)',
        'In-depth knowledge of Sri Lankan history, culture, and tourist destinations',
        'First aid certification',
        'Valid driver\'s license'
      ]
    },
    {
      id: 2,
      title: 'Travel Consultant',
      location: 'Remote (UK-based)',
      type: 'Full-time',
      description: 'Join our team as a Travel Consultant to create personalized luxury travel itineraries for clients traveling to Sri Lanka.',
      requirements: [
        'Previous experience in the travel industry',
        'Knowledge of Sri Lanka as a travel destination',
        'Strong sales and customer service skills',
        'Ability to create detailed, customized travel itineraries',
        'Excellent organization and time management skills'
      ]
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      location: 'Colombo, Sri Lanka',
      type: 'Full-time',
      description: 'Help us showcase the beauty of Sri Lanka to a global audience through effective digital marketing strategies.',
      requirements: [
        'Proven experience in digital marketing, specifically in the travel industry',
        'Proficiency in social media management, SEO, and content creation',
        'Experience with analytics and reporting tools',
        'Creative mindset with an eye for visual storytelling',
        'Bachelor\'s degree in Marketing or related field'
      ]
    }
  ];

  return (
    <StandardPageTemplate
      title="Careers"
      description="Join our team of passionate travel professionals and help create unforgettable Sri Lankan experiences."
      breadcrumbs={[{ label: 'Company', path: '/about' }]}
    >
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-['Playfair_Display']">
          Work With Us
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          At Best Sri Lanka Tours, we're dedicated to providing exceptional travel experiences that showcase the beauty and culture of Sri Lanka. Our success depends on our team of passionate professionals who share our commitment to excellence, sustainability, and authentic travel experiences.
        </p>
        
        <p className="text-lg text-gray-700 mb-6">
          Working with us means being part of a diverse team that values creativity, integrity, and a customer-first approach. We offer competitive compensation, opportunities for professional growth, and the chance to contribute to sustainable tourism in Sri Lanka.
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-10">
          <h3 className="text-xl font-semibold text-[#0077B6] mb-4">
            Our Values
          </h3>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 mt-1 text-[#0077B6]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Passion for Sri Lanka</h4>
                <p className="text-gray-600">We're enthusiastic about sharing Sri Lanka's natural beauty and cultural heritage.</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 mt-1 text-[#0077B6]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Commitment to Sustainability</h4>
                <p className="text-gray-600">We prioritize responsible tourism practices that benefit local communities.</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 mt-1 text-[#0077B6]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Excellence in Service</h4>
                <p className="text-gray-600">We strive to exceed expectations with personalized, high-quality experiences.</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 mt-1 text-[#0077B6]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Continuous Innovation</h4>
                <p className="text-gray-600">We constantly seek new ways to enhance our services and tour experiences.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Current Openings */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-['Playfair_Display']">
          Current Openings
        </h2>
        
        {jobListings.map((job) => (
          <div key={job.id} className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-gradient-to-r from-[#0077B6]/10 to-[#0077B6]/5 p-6">
              <h3 className="text-xl font-semibold text-[#0077B6] mb-2">{job.title}</h3>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BriefcaseBusiness className="w-4 h-4 mr-1" />
                  <span>{job.type}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{job.description}</p>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-4 border-t border-gray-200">
              <button className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-2 px-4 rounded-md transition-all duration-300">
                <Mail className="w-4 h-4" />
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Benefits */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-['Playfair_Display']">
          Benefits of Working With Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#0077B6] mb-4">
              Professional Growth
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Ongoing training and professional development</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Mentorship opportunities</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Career advancement potential</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#0077B6] mb-4">
              Comprehensive Benefits
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Competitive salary packages</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Health insurance coverage</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Paid time off and holidays</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#0077B6] mb-4">
              Work-Life Balance
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Flexible work arrangements</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Remote work options for certain positions</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Company wellness programs</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#0077B6] mb-4">
              Travel Perks
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Familiarization trips to explore Sri Lanka</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Discounts on tour packages for family and friends</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">Opportunity to participate in industry events and conferences</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StandardPageTemplate>
  );
};

export default Careers;