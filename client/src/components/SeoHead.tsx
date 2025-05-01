import { useEffect } from 'react';

export interface SeoProps {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: {
    data?: {
      attributes?: {
        url?: string;
      };
    };
  };
  canonicalURL?: string;
  metaRobots?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: any;
  // Default page title as fallback
  pageTitle?: string;
  // Default page description as fallback
  pageDescription?: string;
}

/**
 * SeoHead component for handling all meta tags with fallbacks
 */
const SeoHead: React.FC<SeoProps> = ({
  metaTitle,
  metaDescription,
  metaImage,
  canonicalURL,
  metaRobots = 'index, follow',
  keywords,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  structuredData,
  // Fallbacks
  pageTitle = 'Best Sri Lanka Tours - Luxury Travel Experiences',
  pageDescription = 'Experience the beauty of Sri Lanka with our luxury, personalized tour packages. Explore beaches, wildlife, ancient temples, and more.'
}) => {
  
  // Use fallbacks when necessary
  const title = metaTitle || pageTitle;
  const description = metaDescription || pageDescription;
  const openGraphTitle = ogTitle || title;
  const openGraphDescription = ogDescription || description;
  const twitterTitleValue = twitterTitle || openGraphTitle;
  const twitterDescriptionValue = twitterDescription || openGraphDescription;
  
  // Default image to use if metaImage is missing
  const defaultImageUrl = 'https://bestsrilankatours.com/default-og-image.jpg';
  const imageUrl = metaImage?.data?.attributes?.url || defaultImageUrl;
  
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Helper function to create or update meta tags
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Helper function for property meta tags (like og: and twitter:)
    const setPropertyMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };
    
    // Basic meta tags
    setMetaTag('description', description);
    
    if (keywords) {
      setMetaTag('keywords', keywords);
    }
    
    if (metaRobots) {
      setMetaTag('robots', metaRobots);
    }
    
    // Open Graph tags
    setPropertyMetaTag('og:title', openGraphTitle);
    setPropertyMetaTag('og:description', openGraphDescription);
    setPropertyMetaTag('og:type', 'website');
    setPropertyMetaTag('og:image', imageUrl);
    
    if (canonicalURL) {
      setPropertyMetaTag('og:url', canonicalURL);
      
      // Set canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      
      canonicalLink.href = canonicalURL;
    }
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', twitterTitleValue);
    setMetaTag('twitter:description', twitterDescriptionValue);
    setMetaTag('twitter:image', imageUrl);
    
    // Structured data script for SEO
    if (structuredData) {
      // Remove existing structured data scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());
      
      // Add new structured data script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
    // Clean up function to remove meta tags on unmount
    return () => {
      // We don't completely remove meta tags on unmount as they might be needed by other pages
      // Structured data is cleaned up during each update
    };
  }, [
    title,
    description,
    metaRobots,
    keywords,
    openGraphTitle,
    openGraphDescription,
    twitterTitleValue,
    twitterDescriptionValue,
    imageUrl,
    canonicalURL,
    structuredData,
  ]);
  
  // This component doesn't render anything visible
  return null;
};

export default SeoHead;