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

/**
 * Submit a contact form to the API
 * @param formData Contact form data to submit
 * @returns Promise with the API response
 * @throws Error if submission fails
 */
export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResponse> => {
  console.log('Submitting form data to API:', formData);
  
  try {
    const response = await fetch('/api/Contact/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('API Response status:', response.status);
    console.log('API Response headers:', [...response.headers.entries()]);
    
    // Check for empty response
    const responseText = await response.text();
    console.log('API Response raw text:', responseText);
    
    // Try to parse JSON only if we have a non-empty response
    let data;
    if (responseText && responseText.trim()) {
      try {
        data = JSON.parse(responseText);
        console.log('API Response parsed data:', data);
      } catch (parseError) {
        console.error('Failed to parse API response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`);
      }
    } else {
      // Empty response handling
      if (response.ok) {
        console.log('API returned empty response with OK status');
        return {
          success: true,
          message: 'Form submitted successfully',
        };
      } else {
        throw new Error(`API error: ${response.status} with empty response`);
      }
    }
    
    // Handle API errors
    if (!response.ok) {
      console.error('API response error:', data);
      throw new Error(data?.message || `API error: ${response.status}`);
    }

    // Return success response
    return {
      success: true,
      message: data?.message || 'Form submitted successfully',
    };
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