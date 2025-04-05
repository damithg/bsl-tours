import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Loader2 } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import EmailPdfDialog from './EmailPdfDialog';

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
    console.log("Download PDF button clicked");
    if (!contentRef.current) {
      console.error("Content ref is null or undefined");
      return;
    }
    
    setIsGenerating(true);
    try {
      console.log("Starting PDF generation process...");
      
      // Create new PDF document directly without using images
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get content for PDF
      const tourName = tourData.name;
      const duration = tourData.duration;
      const price = formatPrice(tourData.startingFrom, { currency: tourData.currency });
      const summary = tourData.summary;
      
      // Add content to PDF directly
      // Title
      pdf.setFontSize(20);
      pdf.text(tourName, 15, 20);
      
      // Duration
      pdf.setFontSize(12);
      pdf.text(`${duration} • Private Luxury Tour`, 15, 30);
      
      // Price
      pdf.setFontSize(14);
      pdf.text(`Starting from ${price} per person`, 15, 40);
      
      // Summary
      pdf.setFontSize(12);
      pdf.text("Overview:", 15, 55);
      
      // Handle multiline text
      const splitSummary = pdf.splitTextToSize(summary, 180);
      pdf.text(splitSummary, 15, 65);
      
      let currentY = 65 + splitSummary.length * 7;
      
      // Tour Highlights
      if (tourData.highlights && tourData.highlights.length > 0) {
        currentY += 10;
        pdf.setFontSize(12);
        pdf.text("Tour Highlights:", 15, currentY);
        currentY += 10;
        
        tourData.highlights.forEach((highlight, index) => {
          pdf.text(`• ${highlight}`, 15, currentY);
          currentY += 7;
        });
      }
      
      // Itinerary
      currentY += 10;
      pdf.setFontSize(14);
      pdf.text("Itinerary", 15, currentY);
      currentY += 10;
      
      tourData.itinerary.forEach((day, index) => {
        pdf.setFontSize(12);
        pdf.text(`Day ${day.day}: ${day.title}`, 15, currentY);
        currentY += 7;
        
        const splitDesc = pdf.splitTextToSize(day.description, 180);
        pdf.setFontSize(10);
        pdf.text(splitDesc, 15, currentY);
        currentY += splitDesc.length * 6 + 5;
        
        // Check if we need a new page
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }
      });
      
      // Inclusions & Exclusions
      if (currentY > 220) {
        pdf.addPage();
        currentY = 20;
      }
      
      // Inclusions
      pdf.setFontSize(14);
      pdf.text("Inclusions", 15, currentY);
      currentY += 10;
      
      tourData.inclusions.forEach((item, index) => {
        pdf.setFontSize(10);
        pdf.text(`• ${item}`, 15, currentY);
        currentY += 7;
        
        // Check if we need a new page
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }
      });
      
      // Add some space
      currentY += 10;
      
      // Exclusions
      if (currentY > 230) {
        pdf.addPage();
        currentY = 20;
      }
      
      pdf.setFontSize(14);
      pdf.text("Exclusions", 15, currentY);
      currentY += 10;
      
      tourData.exclusions.forEach((item, index) => {
        pdf.setFontSize(10);
        pdf.text(`• ${item}`, 15, currentY);
        currentY += 7;
      });
      
      // Contact Information
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Contact Us", 15, 20);
      pdf.setFontSize(10);
      pdf.text("For bookings and inquiries, please contact:", 15, 30);
      pdf.text("Best Sri Lanka Tours", 15, 40);
      pdf.text("Email: info@bestsrilankatours.com", 15, 50);
      pdf.text("Phone: +94 77 123 4567", 15, 60);
      pdf.text("Website: www.bestsrilankatours.com", 15, 70);
      
      // Footer
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 250);
      pdf.text(`© ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.`, 15, 260);
      
      // Save the PDF
      console.log("Saving PDF...");
      const filename = `${tourData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      pdf.save(filename);
      console.log("PDF saved successfully as", filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generatePdfContent = async (): Promise<string | null> => {
    try {
      console.log("Generating PDF content for email...");
      
      // Create new PDF document directly without using images
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get content for PDF
      const tourName = tourData.name;
      const duration = tourData.duration;
      const price = formatPrice(tourData.startingFrom, { currency: tourData.currency });
      const summary = tourData.summary;
      
      // Add content to PDF directly
      // Title
      pdf.setFontSize(20);
      pdf.text(tourName, 15, 20);
      
      // Duration
      pdf.setFontSize(12);
      pdf.text(`${duration} • Private Luxury Tour`, 15, 30);
      
      // Price
      pdf.setFontSize(14);
      pdf.text(`Starting from ${price} per person`, 15, 40);
      
      // Summary
      pdf.setFontSize(12);
      pdf.text("Overview:", 15, 55);
      
      // Handle multiline text
      const splitSummary = pdf.splitTextToSize(summary, 180);
      pdf.text(splitSummary, 15, 65);
      
      let currentY = 65 + splitSummary.length * 7;
      
      // Tour Highlights
      if (tourData.highlights && tourData.highlights.length > 0) {
        currentY += 10;
        pdf.setFontSize(12);
        pdf.text("Tour Highlights:", 15, currentY);
        currentY += 10;
        
        tourData.highlights.forEach((highlight, index) => {
          pdf.text(`• ${highlight}`, 15, currentY);
          currentY += 7;
        });
      }
      
      // Itinerary
      currentY += 10;
      pdf.setFontSize(14);
      pdf.text("Itinerary", 15, currentY);
      currentY += 10;
      
      tourData.itinerary.forEach((day, index) => {
        pdf.setFontSize(12);
        pdf.text(`Day ${day.day}: ${day.title}`, 15, currentY);
        currentY += 7;
        
        const splitDesc = pdf.splitTextToSize(day.description, 180);
        pdf.setFontSize(10);
        pdf.text(splitDesc, 15, currentY);
        currentY += splitDesc.length * 6 + 5;
        
        // Check if we need a new page
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }
      });
      
      // Inclusions & Exclusions
      if (currentY > 220) {
        pdf.addPage();
        currentY = 20;
      }
      
      // Inclusions
      pdf.setFontSize(14);
      pdf.text("Inclusions", 15, currentY);
      currentY += 10;
      
      tourData.inclusions.forEach((item, index) => {
        pdf.setFontSize(10);
        pdf.text(`• ${item}`, 15, currentY);
        currentY += 7;
        
        // Check if we need a new page
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }
      });
      
      // Add some space
      currentY += 10;
      
      // Exclusions
      if (currentY > 230) {
        pdf.addPage();
        currentY = 20;
      }
      
      pdf.setFontSize(14);
      pdf.text("Exclusions", 15, currentY);
      currentY += 10;
      
      tourData.exclusions.forEach((item, index) => {
        pdf.setFontSize(10);
        pdf.text(`• ${item}`, 15, currentY);
        currentY += 7;
      });
      
      // Contact Information
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Contact Us", 15, 20);
      pdf.setFontSize(10);
      pdf.text("For bookings and inquiries, please contact:", 15, 30);
      pdf.text("Best Sri Lanka Tours", 15, 40);
      pdf.text("Email: info@bestsrilankatours.com", 15, 50);
      pdf.text("Phone: +94 77 123 4567", 15, 60);
      pdf.text("Website: www.bestsrilankatours.com", 15, 70);
      
      // Footer
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 250);
      pdf.text(`© ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.`, 15, 260);
      
      // Get PDF as base64 string
      const pdfContent = pdf.output('datauristring');
      return pdfContent;
    } catch (error) {
      console.error('Error generating PDF content:', error);
      return null;
    }
  };
  
  const handleSendEmail = async (recipientEmail: string): Promise<void> => {
    setIsGenerating(true);
    try {
      // Generate the PDF content
      const pdfContent = await generatePdfContent();
      
      if (!pdfContent) {
        throw new Error('Failed to generate PDF content');
      }
      
      // Extract base64 data part only
      const base64Data = pdfContent.split(',')[1];
      
      // Call API to send email with PDF
      const response = await fetch('/api/tours/email-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: recipientEmail,
          tourName: tourData.name,
          pdfContent: base64Data
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
      }
      
      // Show success message
      alert('Tour information has been sent to your email successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      
      let errorMessage = 'There was an error sending the email.';
      const err = error as Error;
      if (err.message?.includes('Email service is not configured')) {
        errorMessage = 'Email service is temporarily unavailable. Please try again later or contact support.';
      }
      
      alert(errorMessage);
      throw err; // Re-throw to be handled by the Dialog component
    } finally {
      setIsGenerating(false);
    }
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
          
          <EmailPdfDialog 
            tourName={tourData.name}
            onSendEmail={handleSendEmail}
            buttonLabel="Email"
            buttonVariant="outline"
          />
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