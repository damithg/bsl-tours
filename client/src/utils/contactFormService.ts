/**
 * Contact Form Service
 * Handles all form submissions across the site to centralize contact functionality
 */

interface ContactFormData {
  formType: string;
  email: string;
  name: string;
  fields: Record<string, string>;
}

interface ContactFormResponse {
  success: boolean;
  message: string;
}

import { API_BASE_URL } from '@/lib/queryClient';

// Re-export API_BASE_URL to make it available to other components
export { API_BASE_URL };

/**
 * Submit a contact form to the API
 * @param formData Contact form data to submit
 * @returns Promise with the API response
 * @throws Error if submission fails
 */
export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResponse> => {
  const apiUrl = `${API_BASE_URL}/api/Contact/send`;
  
  console.log('Submitting form data to API:', formData);
  console.log('Using API URL:', apiUrl);
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('API Response status:', response.status);
    
    // Check for empty response
    const responseText = await response.text();
    console.log('API Response raw text:', responseText);
    
    // Handle non-200 responses
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Even if the response is empty or can't be parsed, if status is 200 OK, we consider it successful
    if (response.ok) {
      // Try to parse any JSON if it exists
      let data = null;
      if (responseText && responseText.trim()) {
        try {
          data = JSON.parse(responseText);
          console.log('API Response parsed data:', data);
          
          // The API returns { success: true } 
          if (data?.success === false) {
            throw new Error(data.message || 'API reported failure');
          }
        } catch (parseError) {
          console.warn('Non-critical: Could not parse response as JSON:', responseText);
          // We'll still return success since the status was OK
        }
      }

      // Return success response
      return {
        success: true,
        message: data?.message || 'Form submitted successfully',
      };
    }
    
    // This should never execute due to the response.ok check above, but as a fallback
    throw new Error('Unexpected error with form submission');
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error; // Re-throw the error for the component to handle
  }
};

/**
 * Helper function to create a properly formatted contact form payload
 * @param formType The type of form being submitted (e.g., 'general', 'tour-inquiry', 'brochure-request')
 * @param name The name of the person submitting the form
 * @param email The email address of the person submitting the form
 * @param fields Additional fields specific to the form type
 * @returns Formatted contact form data
 */
export const createContactFormData = (
  formType: string,
  name: string,
  email: string,
  fields: Record<string, string>
): ContactFormData => {
  return {
    formType,
    name,
    email,
    fields,
  };
};

/**
 * Types of forms supported by the contact form service
 */
export enum FormType {
  GENERAL_CONTACT = 'general-contact',
  TOUR_INQUIRY = 'tour-inquiry',
  BROCHURE_REQUEST = 'brochure-request',
  NEWSLETTER_SIGNUP = 'newsletter-signup',
  CUSTOM_TOUR = 'custom-tour',
}