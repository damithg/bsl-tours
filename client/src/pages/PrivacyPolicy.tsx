import React from 'react';
import SeoHead from '@/components/SeoHead';

const PrivacyPolicy = () => {
  // SEO data for the Privacy Policy page
  const seoData = {
    metaTitle: "Privacy Policy | Best Sri Lanka Tours",
    metaDescription: "Read our privacy policy to understand how Best Sri Lanka Tours collects, uses, and protects your personal information.",
    canonicalURL: "https://bestsrilankatours.com/privacy-policy",
    metaRobots: "noindex, follow", // Example of a legal page that should not be indexed
    keywords: "privacy policy, data protection, personal information, sri lanka tours",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "Best Sri Lanka Tours privacy policy page.",
      "url": "https://bestsrilankatours.com/privacy-policy"
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 pt-32 max-w-4xl">
      <SeoHead {...seoData} />
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#004E64] font-['Playfair_Display']">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-8">
          At Best Sri Lanka Tours, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our services.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when making inquiries or bookings.</li>
            <li><strong>Travel Information:</strong> Travel dates, preferences, passport details, and other information necessary to arrange your tour.</li>
            <li><strong>Payment Information:</strong> Credit card details, billing address, and other financial information necessary for processing payments.</li>
            <li><strong>Browsing Information:</strong> Information about how you use our website, including browsing patterns, pages visited, and features used.</li>
            <li><strong>Device Information:</strong> Information about the device you use to access our website, including IP address, browser type, and operating system.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>To provide and personalize our services to you</li>
            <li>To process and confirm your tour bookings</li>
            <li>To communicate with you about your inquiries and bookings</li>
            <li>To send you updates, newsletters, and promotional materials (if you have subscribed)</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Service Providers:</strong> Hotels, transportation companies, guides, and other service providers necessary to complete your booking.</li>
            <li><strong>Payment Processors:</strong> Financial institutions and payment service providers to process your payments.</li>
            <li><strong>Business Partners:</strong> Trusted business partners who help us provide our services.</li>
            <li><strong>Legal Authorities:</strong> Government authorities when required by law or to protect our rights.</li>
          </ul>
          <p className="mt-4">We do not sell your personal information to third parties.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, 
            disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, 
            and we cannot guarantee absolute security.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing of your personal information</li>
            <li>Data portability</li>
            <li>Objection to processing of your personal information</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at <a href="mailto:damithg@gmail.com" className="text-[#0077B6] hover:underline">damithg@gmail.com</a>.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. 
            If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
            and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> <a href="mailto:damithg@gmail.com" className="text-[#0077B6] hover:underline">damithg@gmail.com</a><br />
            <strong>Phone:</strong> +94 77 123 4567
          </p>
        </div>

        <div className="text-sm text-gray-500 mt-12 pt-4 border-t border-gray-200">
          Last Updated: April 12, 2025
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;