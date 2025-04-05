import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Loader2 } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

// Define TourData interface here in case of module import issues
interface TourImage {
  publicId?: string;
  alt?: string;
  caption?: string;
  orientation?: string;
  baseUrl?: string;
  small?: string;
  medium?: string;
  large?: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: TourImage;
}

interface MapPoint {
  id: number | string;
  name: string;
  x: number;
  y: number;
  day?: number;
}

interface TourData {
  id: number;
  name: string;
  slug: string;
  featured: boolean;
  summary: string;
  duration: string;
  startingFrom: number;
  currency: string;
  heroImage?: TourImage;
  cardImage?: TourImage;
  galleryImages?: TourImage[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  highlights?: string[];
  mapImage?: string;
  mapPoints?: MapPoint[];
}

interface TourPDFGeneratorProps {
  tourData: TourData;
  isGenerating?: boolean;
}

const TourPDFGenerator: React.FC<TourPDFGeneratorProps> = ({ 
  tourData,
  isGenerating: initialIsGenerating = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useCurrency();
  const [isGenerating, setIsGenerating] = useState(initialIsGenerating);
  
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsGenerating(true);
    try {
      // Generate PDF using html2canvas and jsPDF
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save(`${tourData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleEmailPDF = () => {
    // Prepare email subject and body
    const subject = `Explore ${tourData.name} with Best Sri Lanka Tours`;
    const body = `I found this amazing ${tourData.duration} tour in Sri Lanka that I thought you might be interested in!\n\n${window.location.href}\n\nCheck it out!`;
    
    // Create email link
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Share this tour</h2>
        <p className="text-sm text-gray-600 mb-4">Download or email a PDF version of this tour to share with friends and family</p>
        
        <div className="flex flex-col xs:flex-row gap-2">
          <Button 
            onClick={handleDownloadPDF}
            className="w-full flex items-center justify-center"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download PDF
          </Button>
          
          <Button 
            onClick={handleEmailPDF}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
        </div>
      </div>
      
      {/* Hidden container that will be rendered to PDF */}
      <div className="hidden">
        <div ref={contentRef} className="pdf-content p-8 max-w-[800px] mx-auto bg-white">
          {/* PDF Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{tourData.name}</h1>
              <p className="text-gray-600">{tourData.duration} • Private Luxury Tour</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary text-xl">
                {formatPrice(tourData.startingFrom, { currency: tourData.currency })}
              </div>
              <p className="text-sm text-gray-500">per person</p>
            </div>
          </div>
          
          {/* Hero Image */}
          {tourData.heroImage && (
            <div className="mb-6">
              <img 
                src={tourData.heroImage.large || tourData.heroImage.medium || tourData.heroImage.small || tourData.heroImage.baseUrl}
                alt={tourData.heroImage.alt || tourData.name}
                className="w-full h-auto object-cover rounded-lg"
                style={{ maxHeight: '300px' }}
                crossOrigin="anonymous"
              />
            </div>
          )}
          
          {/* Tour Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700">{tourData.summary}</p>
          </div>
          
          {/* Tour Highlights */}
          {tourData.highlights && tourData.highlights.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Tour Highlights</h2>
              <ul className="list-disc pl-5 space-y-1">
                {tourData.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="text-gray-700">{highlight}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Itinerary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
            <div className="space-y-4">
              {tourData.itinerary.map((day: ItineraryDay, index: number) => (
                <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                  <h3 className="font-semibold text-lg">Day {day.day}: {day.title}</h3>
                  <p className="text-gray-700">{day.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Inclusions</h2>
              <ul className="list-disc pl-5 space-y-1">
                {tourData.inclusions.map((item: string, index: number) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Exclusions</h2>
              <ul className="list-disc pl-5 space-y-1">
                {tourData.exclusions.map((item: string, index: number) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700 mb-2">
              For bookings and inquiries, please contact:
            </p>
            <div className="text-gray-700">
              <p>Best Sri Lanka Tours</p>
              <p>Email: info@bestsrilankatours.com</p>
              <p>Phone: +94 77 123 4567</p>
              <p>Website: www.bestsrilankatours.com</p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>Generated on {new Date().toLocaleDateString()}</p>
            <p>© {new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPDFGenerator;