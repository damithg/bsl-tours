import { useState } from 'react';
import { Link } from 'wouter';
import { Tag, BookOpen, Sun, Bell, Calendar, FileText, Send, CheckCircle, Mail, Users, Gift, Globe, ArrowRight, Star } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import { COLORS } from '@/utils/colors';
import { submitContactForm, createContactFormData, FormType } from '@/utils/contactFormService';

const NewsletterModern = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitted, setSubmitted] = useState(false);

  const newsletterBenefits = [
    {
      title: "Exclusive Travel Deals",
      description: "First access to seasonal promotions and member-only discounts",
      icon: <Gift className="w-8 h-8" style={{ color: COLORS.primary }} />,
      highlight: "Up to 25% off"
    },
    {
      title: "Insider Destination Tips",
      description: "Hidden gems and local secrets from our travel experts",
      icon: <Globe className="w-8 h-8" style={{ color: COLORS.primary }} />,
      highlight: "Expert curated"
    },
    {
      title: "Seasonal Travel Guides",
      description: "Perfect timing recommendations for every region",
      icon: <Sun className="w-8 h-8" style={{ color: COLORS.primary }} />,
      highlight: "Weather insights"
    },
    {
      title: "New Experience Alerts",
      description: "Be first to discover our latest tour packages",
      icon: <Bell className="w-8 h-8" style={{ color: COLORS.primary }} />,
      highlight: "Early access"
    }
  ];

  const interestOptions = [
    "Cultural Heritage",
    "Wildlife & Nature",
    "Beach & Relaxation",
    "Adventure Activities",
    "Food & Cuisine",
    "Photography Tours",
    "Wellness & Spa",
    "Family Travel"
  ];

  const stats = [
    { number: "15,000+", label: "Happy Subscribers" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "Monthly", label: "Curated Content" },
    { number: "24hrs", label: "Response Time" }
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) return;

    try {
      setSubmitStatus('loading');
      
      const formData = createContactFormData(
        FormType.NEWSLETTER_SIGNUP,
        name,
        email,
        { 
          interests: interests.join(', '),
          source: 'newsletter_page'
        }
      );
      
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitted(true);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Sri Lanka Travel Newsletter"
        subtitle="Join 15,000+ travelers discovering Sri Lanka's hidden treasures through our monthly insider's guide"
        imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        imageAlt="Sri Lankan temple and landscape"
        overlayOpacity={30}
        height="h-[70vh]"
        showBreadcrumbs={true}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Newsletter', href: '/newsletter' }
        ]}
      />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: COLORS.primary }}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
              Why 15,000+ Travelers Trust Our Newsletter
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get exclusive access to insider travel tips, hidden gems, and special offers that make your Sri Lankan adventure unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsletterBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-[#F6E27F]/20 group-hover:bg-[#F6E27F]/30 transition-colors">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3 text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full" 
                      style={{ backgroundColor: `${COLORS.secondary}40`, color: COLORS.primary }}>
                  {benefit.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-6" style={{ color: COLORS.primary }}>
                A Sneak Peek Inside Our Newsletter
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.secondary }}>
                    <Star className="w-4 h-4" style={{ color: COLORS.primary }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Featured Destination Spotlight</h3>
                    <p className="text-gray-600">Monthly deep-dive into a must-visit Sri Lankan location with insider tips and local recommendations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.secondary }}>
                    <Gift className="w-4 h-4" style={{ color: COLORS.primary }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Exclusive Subscriber Offers</h3>
                    <p className="text-gray-600">Special discounts and early access to new tours, available only to our newsletter family.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.secondary }}>
                    <Calendar className="w-4 h-4" style={{ color: COLORS.primary }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Seasonal Travel Calendar</h3>
                    <p className="text-gray-600">Best times to visit specific regions, festival dates, and weather insights for optimal trip planning.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: `${COLORS.primary}10` }}>
                <p className="text-gray-700 italic mb-3">
                  "The newsletter has transformed how we plan our Sri Lankan adventures. The insider tips and seasonal recommendations are invaluable!"
                </p>
                <p className="font-semibold" style={{ color: COLORS.primary }}>— Sarah & Mark, UK Travelers</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#0077B6] to-[#004E64] rounded-2xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="text-center mb-6">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-[#F6E27F]" />
                  <h3 className="text-2xl font-bold mb-2">Sri Lanka Insider</h3>
                  <p className="text-blue-100">Monthly Edition • April 2025</p>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="border-t border-blue-300/30 pt-4">
                    <h4 className="font-semibold text-[#F6E27F] mb-2">This Month's Features:</h4>
                    <ul className="space-y-1 text-blue-100">
                      <li>• Hidden waterfalls of Ella</li>
                      <li>• Festival season guide</li>
                      <li>• 20% off hill country tours</li>
                      <li>• Photography tips & locations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-20 bg-gradient-to-br from-[#FAF9F6] to-[#F6E27F]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
                <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: COLORS.primary }} />
                <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>
                  Welcome to Our Travel Community!
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Thank you for joining 15,000+ fellow travelers. Your first newsletter will arrive within 48 hours, packed with exclusive Sri Lankan travel insights.
                </p>
                <div className="space-y-3 text-gray-600 mb-8">
                  <p>✓ Check your email for a welcome message</p>
                  <p>✓ Add us to your contacts to ensure delivery</p>
                  <p>✓ Follow us on social media for daily inspiration</p>
                </div>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Explore Our Tours <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="text-center mb-8">
                  <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
                    Join Our Travel Community
                  </h2>
                  <p className="text-lg text-gray-700">
                    Subscribe now and get instant access to our complete Sri Lanka travel guide plus monthly insider updates.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Travel Interests (Optional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {interestOptions.map((interest) => (
                        <label 
                          key={interest}
                          className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            interests.includes(interest)
                              ? 'border-current text-white'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                          style={interests.includes(interest) ? { backgroundColor: COLORS.primary, borderColor: COLORS.primary } : {}}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={interests.includes(interest)}
                            onChange={() => handleInterestToggle(interest)}
                          />
                          <span className="text-sm font-medium text-center">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="inline-flex items-center gap-3 px-12 py-4 rounded-full text-white font-medium text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Start My Journey
                        </>
                      )}
                    </button>
                    
                    {submitStatus === 'error' && (
                      <p className="mt-4 text-red-600">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    We respect your privacy. Unsubscribe anytime with one click. No spam, ever.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!submitted && (
        <section className="py-16" style={{ backgroundColor: COLORS.primary }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Discover Sri Lanka's Best-Kept Secrets?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust our expert insights to create their perfect Sri Lankan adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white rounded-full font-medium transition-all hover:scale-105"
                style={{ color: COLORS.primary }}
              >
                Plan Your Custom Tour <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/tours"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white rounded-full font-medium transition-all hover:bg-white/10"
              >
                Browse All Tours
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default NewsletterModern;