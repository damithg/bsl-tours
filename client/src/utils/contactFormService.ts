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
 */
export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResponse> => {
  try {
    const response = await fetch('/api/Contact/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || 'Form submitted successfully',
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
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