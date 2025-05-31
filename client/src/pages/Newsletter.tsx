import { useState } from 'react';
import { Link } from 'wouter';
import { Mail, Check, ArrowRight, MapPin, Users, Globe, Calendar } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import { COLORS } from '@/utils/colors';
import { submitContactForm, createContactFormData, FormType } from '@/utils/contactFormService';
import TurnstileWidget from '@/components/TurnstileWidget';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
  };
  
  const handleTurnstileExpired = () => {
    setTurnstileToken(null);
  };
  
  const handleTurnstileError = () => {
    setTurnstileToken(null);
    setSubmitStatus('error');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) return;
    
    if (!turnstileToken) {
      setSubmitStatus('error');
      return;
    }

    try {
      setSubmitStatus('loading');
      
      const formData = createContactFormData(
        FormType.NEWSLETTER_SIGNUP,
        name,
        email,
        { 
          source: 'newsletter_elegant_page',
          turnstileToken: turnstileToken
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
        title="Sri Lanka Travel Insights"
        description="Discover the island's most captivating destinations and experiences through our curated travel insights"
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743772333/destinations/hambantota-hero.jpg"
        breadcrumbItems={[
          { label: 'Newsletter' }
        ]}
        overlayOpacity={40}
      />

      {/* Main Content Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: COLORS.primary }}>
                  Journey with Sri Lanka's Travel Experts
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                  Each month, we share carefully curated insights about Sri Lanka's hidden treasures, 
                  seasonal highlights, and exclusive experiences that transform ordinary trips into extraordinary adventures.
                </p>
              </div>

              {/* What You'll Receive */}
              <div className="space-y-6">
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: COLORS.primary }}>
                  What You'll Discover
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: `${COLORS.secondary}40` }}>
                      <MapPin className="w-4 h-4" style={{ color: COLORS.primary }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Hidden Destinations</h4>
                      <p className="text-gray-600 text-sm">Off-the-beaten-path locations and local secrets</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: `${COLORS.secondary}40` }}>
                      <Calendar className="w-4 h-4" style={{ color: COLORS.primary }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Seasonal Insights</h4>
                      <p className="text-gray-600 text-sm">Perfect timing for different regions and activities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: `${COLORS.secondary}40` }}>
                      <Users className="w-4 h-4" style={{ color: COLORS.primary }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Cultural Experiences</h4>
                      <p className="text-gray-600 text-sm">Authentic encounters with local traditions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: `${COLORS.secondary}40` }}>
                      <Globe className="w-4 h-4" style={{ color: COLORS.primary }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Exclusive Offers</h4>
                      <p className="text-gray-600 text-sm">Special pricing and early access to new tours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderLeftColor: COLORS.secondary }}>
                <p className="text-gray-700 italic mb-4">
                  "The monthly insights helped us discover places in Sri Lanka we never would have found on our own. 
                  Each newsletter feels like getting advice from a knowledgeable local friend."
                </p>
                <div className="pt-3">
                  <p className="font-semibold text-gray-800">Sarah Thompson</p>
                  <p className="text-sm text-gray-600">Travel Photographer, London</p>
                </div>
              </div>
            </div>

            {/* Right Column - Subscription Form */}
            <div className="lg:pl-8">
              {submitted ? (
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${COLORS.primary}20` }}>
                    <Check className="w-8 h-8" style={{ color: COLORS.primary }} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
                    Welcome to Our Community!
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Thank you for joining our travel community. Your first newsletter will arrive within 48 hours with exclusive Sri Lankan travel insights.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <p>✓ Check your email for a welcome message</p>
                    <p>✓ Follow us on social media for daily inspiration</p>
                  </div>
                  <Link 
                    href="/tours"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all hover:scale-105"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Explore Our Tours <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${COLORS.secondary}40` }}>
                      <Mail className="w-8 h-8" style={{ color: COLORS.primary }} />
                    </div>
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>
                      Start Your Journey
                    </h3>
                    <p className="text-gray-600">
                      Join thousands of travelers discovering Sri Lanka's magic
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
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
                        Email Address
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

                    {/* Security Verification */}
                    <TurnstileWidget
                      onSuccess={handleTurnstileSuccess}
                      onExpired={handleTurnstileExpired}
                      onError={handleTurnstileError}
                      className="mb-4"
                    />

                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-white font-medium text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          Subscribe to Insights
                        </>
                      )}
                    </button>
                    
                    {submitStatus === 'error' && (
                      <p className="text-red-600 text-sm text-center">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. Unsubscribe anytime. No spam, ever.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
              Featured in Our Recent Newsletters
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              A glimpse of the stunning destinations and experiences we've shared with our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743979276/tours/cultural-triangle-luxury-tour-sigiriya.jpg"
                alt="Sigiriya Rock Fortress"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-1">Ancient Sigiriya</h3>
                <p className="text-sm">Best climbing times and photography spots</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/kandy-viewpoint.jpg"
                alt="Temple of the Tooth"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-1">Sacred Kandy</h3>
                <p className="text-sm">Temple ceremonies and cultural insights</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744108133/tours/epic-sri-lanka-train-hero.jpg"
                alt="Tea Plantations"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-1">Hill Country</h3>
                <p className="text-sm">Tea estate tours and mountain railways</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-20" style={{ backgroundColor: COLORS.primary }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Sri Lanka?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let our travel experts design your perfect Sri Lankan adventure with personalized recommendations and insider access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white rounded-full font-medium transition-all hover:scale-105"
              style={{ color: COLORS.primary }}
            >
              Plan Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/tours"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white rounded-full font-medium transition-all hover:bg-white/10"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Newsletter;