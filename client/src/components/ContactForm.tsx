import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertInquirySchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { submitContactForm, createContactFormData, FormType } from '@/utils/contactFormService';
import { AlertCircle, CheckCircle } from 'lucide-react';
import TurnstileWidget from './TurnstileWidget';

// Extend the inquiry schema with additional validation
const contactFormSchema = insertInquirySchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  tourName?: string;
  prefilledMessage?: string;
}

const ContactForm = ({ tourName, prefilledMessage }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
  };
  
  const handleTurnstileExpired = () => {
    setTurnstileToken(null);
  };
  
  const handleTurnstileError = () => {
    setTurnstileToken(null);
    setSubmitStatus({
      type: 'error',
      message: 'Security verification failed. Please try again.'
    });
  };
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      travelDates: '',
      packageInterest: tourName || '',
      message: prefilledMessage || '',
      subscribed: false,
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });
      
      // Validate Turnstile
      if (!turnstileToken) {
        setSubmitStatus({
          type: 'error',
          message: 'Please complete the security verification.'
        });
        setIsSubmitting(false);
        return;
      }
      
      // Prepare data for the contact form API endpoint (restore original working method)
      const contactFormData = createContactFormData(
        FormType.GENERAL_CONTACT,
        `${data.firstName} ${data.lastName}`,
        data.email,
        {
          phone: data.phone || '',
          travelDates: data.travelDates || '',
          packageInterest: data.packageInterest || '',
          message: data.message,
          subscribed: data.subscribed ? 'yes' : 'no',
          turnstileToken: turnstileToken // Add Turnstile token to the data
        }
      );
      
      // Submit to the original working API endpoint
      await submitContactForm(contactFormData);
        
      setSubmitStatus({
        type: 'success',
        message: "Thank you for your inquiry. We'll get back to you within 24 hours."
      });
      
      console.log('Contact form submitted successfully via local API endpoint');
      reset();
      setTurnstileToken(null); // Reset Turnstile after successful submission
        
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      
      // Reset Turnstile widget for next submission  
      setTurnstileToken(null);
      
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error 
          ? error.message 
          : "Failed to submit your inquiry. Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">First Name *</label>
            <input 
              type="text" 
              id="firstName" 
              {...register('firstName')}
              className={`block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-[#0F4C81] focus:border-[#0F4C81] bg-gray-50 ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && (
              <p className="mt-1 text-base font-['Raleway'] text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">Last Name *</label>
            <input 
              type="text" 
              id="lastName" 
              {...register('lastName')}
              className={`block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-[#0F4C81] focus:border-[#0F4C81] bg-gray-50 ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && (
              <p className="mt-1 text-base font-['Raleway'] text-red-600">{errors.lastName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              {...register('email')}
              className={`block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-[#0F4C81] focus:border-[#0F4C81] bg-gray-50 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-base font-['Raleway'] text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              {...register('phone')}
              className="block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-[#0F4C81] focus:border-[#0F4C81] bg-gray-50"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="travelDates" className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">Preferred Travel Dates</label>
          <input 
            type="text" 
            id="travelDates" 
            {...register('travelDates')}
            placeholder="MM/DD/YYYY - MM/DD/YYYY" 
            className="block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-[#0F4C81] focus:border-[#0F4C81] bg-gray-50"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="packageInterest" className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">Interested In</label>
          <select 
            id="packageInterest" 
            {...register('packageInterest')}
            className="block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-[#0F4C81] focus:border-[#0F4C81] bg-gray-50"
          >
            <option value="">Select a Package or Experience</option>
            {tourName && <option value={tourName}>{tourName}</option>}
            <option value="cultural">Cultural Triangle Tour</option>
            <option value="coastal">Coastal Serenity Escape</option>
            <option value="tea">Hill Country Tea Trails</option>
            <option value="wildlife">Wildlife Safari Experience</option>
            <option value="custom">Custom Luxury Journey</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">Your Requirements *</label>
          <textarea 
            id="message" 
            {...register('message')}
            rows={4} 
            className={`block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-[#0F4C81] focus:border-[#0F4C81] bg-gray-50 ${errors.message ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-base font-['Raleway'] text-red-600">{errors.message.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              {...register('subscribed')}
              className="rounded border-gray-300 text-[#0F4C81] focus:ring-[#0F4C81]"
            />
            <span className="ml-2 text-base font-['Raleway'] text-gray-700">Subscribe to our newsletter for exclusive offers and travel inspiration</span>
          </label>
        </div>
        
        {/* Security Verification */}
        <TurnstileWidget
          onSuccess={handleTurnstileSuccess}
          onExpired={handleTurnstileExpired}
          onError={handleTurnstileError}
          className="mb-8"
        />
        
        <button 
          type="submit" 
          className="w-full bg-[#0F4C81] hover:bg-opacity-90 text-white text-lg font-medium py-3 px-4 rounded-md transition flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Inquiry'
          )}
        </button>
        
        {/* Status message displayed below the form */}
        {submitStatus.type && (
          <div className={`mt-6 p-4 rounded-lg transition-opacity duration-300 ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start">
              {submitStatus.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
              )}
              <div>
                <p className={`text-base ${
                  submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {submitStatus.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
