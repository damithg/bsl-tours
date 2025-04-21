import React from 'react';
import SeoHead from '@/components/SeoHead';

const CookiePolicy = () => {
  // SEO data for the Cookie Policy page
  const seoData = {
    metaTitle: "Cookie Policy | Best Sri Lanka Tours",
    metaDescription: "Learn about how Best Sri Lanka Tours uses cookies and similar technologies on our website.",
    canonicalURL: "https://bestsrilankatours.com/cookie-policy",
    metaRobots: "noindex, follow", // Example of a legal page that should not be indexed
    keywords: "cookie policy, cookies, privacy, data tracking, sri lanka tours",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cookie Policy",
      "description": "Best Sri Lanka Tours cookie policy page.",
      "url": "https://bestsrilankatours.com/cookie-policy"
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 pt-32 max-w-4xl">
      <SeoHead {...seoData} />
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#004E64] font-['Playfair_Display']">Cookie Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead mb-8">
          This Cookie Policy explains how Best Sri Lanka Tours uses cookies and similar technologies on our website. 
          By using our website, you consent to the use of cookies as described in this policy.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. 
            Cookies help to provide a better and more personalized user experience. They enable websites to remember your actions 
            and preferences (such as login, language, font size, and other display preferences) over a period of time, 
            so you don't have to re-enter them whenever you come back to the site or browse from one page to another.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Types of Cookies We Use</h2>
          <p>We use the following types of cookies on our website:</p>
          
          <h3 className="text-xl font-semibold text-[#0077B6] mt-6 mb-3">Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation, 
            access to secure areas of the website, and booking functionalities. The website cannot function properly without these cookies.
          </p>
          
          <h3 className="text-xl font-semibold text-[#0077B6] mt-6 mb-3">Preference Cookies</h3>
          <p>
            These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) 
            and provide enhanced, more personalized features. They can also be used to remember changes you have made to text size, 
            fonts, and other parts of web pages that you can customize.
          </p>
          
          <h3 className="text-xl font-semibold text-[#0077B6] mt-6 mb-3">Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. 
            They help us to improve our website and services by providing insights into how users browse and use our site.
          </p>
          
          <h3 className="text-xl font-semibold text-[#0077B6] mt-6 mb-3">Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites. They are used to display ads that are relevant and engaging for 
            individual users and thereby more valuable for publishers and third-party advertisers.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, 
            and so on. These cookies may include:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Google Analytics:</strong> To analyze how users use our website</li>
            <li><strong>Google AdSense:</strong> To deliver personalized advertisements</li>
            <li><strong>Facebook Pixel:</strong> To measure the effectiveness of our advertisements and to build audience lists for advertising</li>
            <li><strong>HotJar:</strong> To better understand how users interact with our website</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites 
            to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. 
            It may also stop you from saving customized settings like login information.
          </p>
          <p className="mt-4">
            To manage cookies in different web browsers, please visit the following links:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><a href="https://support.google.com/accounts/answer/61416" target="_blank" rel="noopener noreferrer" className="text-[#0077B6] hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#0077B6] hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0077B6] hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#0077B6] hover:underline">Microsoft Edge</a></li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Cookie Consent</h2>
          <p>
            When you first visit our website, you will be presented with a cookie consent banner that allows you to accept or decline 
            non-essential cookies. You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the 
            footer of our website.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Changes to Our Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. Any changes will be posted on this page and will become effective immediately. 
            We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and other similar technologies.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#004E64] mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;