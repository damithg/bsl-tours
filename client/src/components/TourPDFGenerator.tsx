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
  
  // Function to create page template with borders, logo, etc.
  const createPageTemplate = (pdf: jsPDF, pageNum: number = 1) => {
    // Load logo image
    const imgData = `/pdf-assets/logo.png`;
    
    // Draw borders
    pdf.setDrawColor(51, 102, 153); // #336699 - primary blue
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, 190, 277, 'S'); // Outer border
    
    pdf.setDrawColor(144, 41, 35); // #902923 - accent color
    pdf.setLineWidth(0.3);
    pdf.roundedRect(13, 13, 184, 271, 1, 1, 'S'); // Inner border
    
    // Add logo
    pdf.addImage(imgData, 'PNG', 15, 15, 50, 20);
    
    // Add divider
    pdf.setDrawColor(51, 102, 153); // #336699 - primary blue
    pdf.setLineWidth(0.5);
    pdf.line(15, 40, 195, 40);
    
    // Add page number (except for first page)
    if (pageNum > 1) {
      pdf.setFontSize(8);
      pdf.setTextColor(102, 102, 102);
      pdf.text(`Page ${pageNum}`, 190, 285, { align: 'right' });
    }
    
    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(102, 102, 102);
    pdf.text('Best Sri Lanka Tours | info@bestsrilankatours.com | +94 77 123 4567 | www.bestsrilankatours.com', 105, 280, { align: 'center' });
    pdf.text(`Generated on ${new Date().toLocaleDateString()} | © ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.`, 105, 285, { align: 'center' });
  };
  
  const handleDownloadPDF = async () => {
    console.log("Download PDF button clicked");
    if (!contentRef.current) {
      console.error("Content ref is null or undefined");
      return;
    }
    
    setIsGenerating(true);
    try {
      console.log("Starting PDF generation process...");
      
      // Create new PDF document
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
      
      // Set up first page
      let pageNum = 1;
      createPageTemplate(pdf, pageNum);
      
      // Add title and header content
      pdf.setTextColor(51, 102, 153); // #336699 - primary blue
      pdf.setFontSize(22);
      pdf.text(tourName, 105, 55, { align: 'center' });
      
      // Duration
      pdf.setTextColor(0);
      pdf.setFontSize(14);
      pdf.text(`${duration} • Private Luxury Tour`, 105, 65, { align: 'center' });
      
      // Price
      pdf.setFontSize(16);
      pdf.setTextColor(144, 41, 35); // #902923 - accent color
      pdf.text(`Starting from ${price} per person`, 105, 75, { align: 'center' });
      
      // Summary
      pdf.setTextColor(0);
      pdf.setFontSize(12);
      pdf.text("Tour Overview", 15, 90);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, 92, 50, 92);
      
      // Handle multiline text
      pdf.setFontSize(10);
      const splitSummary = pdf.splitTextToSize(summary, 180);
      pdf.text(splitSummary, 15, 100);
      
      let currentY = 100 + splitSummary.length * 5;
      
      // Function to add new page
      const addNewPage = () => {
        pageNum++;
        pdf.addPage();
        createPageTemplate(pdf, pageNum);
        return 50; // Return new Y position after header
      };
      
      // Tour Highlights
      if (tourData.highlights && tourData.highlights.length > 0) {
        // Check if we need a new page
        if (currentY > 240) {
          currentY = addNewPage();
        } else {
          currentY += 10;
        }
        
        pdf.setTextColor(51, 102, 153); // Primary color for headings
        pdf.setFontSize(12);
        pdf.text("Tour Highlights", 15, currentY);
        
        // Add decorative line below heading
        pdf.setDrawColor(144, 41, 35); // #902923 - accent color
        pdf.setLineWidth(0.5);
        pdf.line(15, currentY + 2, 50, currentY + 2);
        
        currentY += 10;
        
        pdf.setTextColor(0); // Back to black for content
        tourData.highlights.forEach((highlight, index) => {
          // Check if we need a new page
          if (currentY > 270) {
            currentY = addNewPage();
          }
          
          pdf.setFontSize(10);
          const splitHighlight = pdf.splitTextToSize(`• ${highlight}`, 180);
          pdf.text(splitHighlight, 15, currentY);
          currentY += splitHighlight.length * 5 + 2;
        });
      }
      
      // Itinerary
      // Check if we need a new page
      if (currentY > 240) {
        currentY = addNewPage();
      } else {
        currentY += 10;
      }
      
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(14);
      pdf.text("Itinerary", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black for content
      tourData.itinerary.forEach((day, index) => {
        // Check if we need a new page
        if (currentY > 250) {
          currentY = addNewPage();
        }
        
        pdf.setFontSize(11);
        pdf.setTextColor(144, 41, 35); // Accent color for day titles
        pdf.text(`Day ${day.day}: ${day.title}`, 15, currentY);
        currentY += 7;
        
        pdf.setTextColor(0); // Back to black for description
        pdf.setFontSize(10);
        const splitDesc = pdf.splitTextToSize(day.description, 180);
        pdf.text(splitDesc, 15, currentY);
        currentY += splitDesc.length * 5 + 5;
      });
      
      // Inclusions & Exclusions
      // Check if we need a new page for Inclusions
      if (currentY > 240) {
        currentY = addNewPage();
      } else {
        currentY += 10;
      }
      
      // Inclusions
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(12);
      pdf.text("Inclusions", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black for content
      tourData.inclusions.forEach((item) => {
        // Check if we need a new page
        if (currentY > 270) {
          currentY = addNewPage();
        }
        
        pdf.setFontSize(10);
        const splitInclusion = pdf.splitTextToSize(`• ${item}`, 180);
        pdf.text(splitInclusion, 15, currentY);
        currentY += splitInclusion.length * 5 + 2;
      });
      
      // Check if we need a new page for Exclusions
      if (currentY > 240) {
        currentY = addNewPage();
      } else {
        currentY += 10;
      }
      
      // Exclusions
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(12);
      pdf.text("Exclusions", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black for content
      tourData.exclusions.forEach((item) => {
        // Check if we need a new page
        if (currentY > 270) {
          currentY = addNewPage();
        }
        
        pdf.setFontSize(10);
        const splitExclusion = pdf.splitTextToSize(`• ${item}`, 180);
        pdf.text(splitExclusion, 15, currentY);
        currentY += splitExclusion.length * 5 + 2;
      });
      
      // Contact Information - always on a new page
      currentY = addNewPage();
      
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(14);
      pdf.text("Contact Us", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black
      pdf.setFontSize(10);
      pdf.text("For bookings and inquiries, please contact:", 15, currentY);
      currentY += 10;
      
      pdf.setFontSize(10);
      pdf.setTextColor(0);
      pdf.text("Best Sri Lanka Tours", 15, currentY); currentY += 5;
      pdf.text("Email: info@bestsrilankatours.com", 15, currentY); currentY += 5;
      pdf.text("Phone: +94 77 123 4567", 15, currentY); currentY += 5;
      pdf.text("Website: www.bestsrilankatours.com", 15, currentY);
      
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
      
      // Create new PDF document
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
      
      // Set up first page
      let pageNum = 1;
      createPageTemplate(pdf, pageNum);
      
      // Add title and header content
      pdf.setTextColor(51, 102, 153); // #336699 - primary blue
      pdf.setFontSize(22);
      pdf.text(tourName, 105, 55, { align: 'center' });
      
      // Duration
      pdf.setTextColor(0);
      pdf.setFontSize(14);
      pdf.text(`${duration} • Private Luxury Tour`, 105, 65, { align: 'center' });
      
      // Price
      pdf.setFontSize(16);
      pdf.setTextColor(144, 41, 35); // #902923 - accent color
      pdf.text(`Starting from ${price} per person`, 105, 75, { align: 'center' });
      
      // Summary
      pdf.setTextColor(0);
      pdf.setFontSize(12);
      pdf.text("Tour Overview", 15, 90);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, 92, 50, 92);
      
      // Handle multiline text
      pdf.setFontSize(10);
      const splitSummary = pdf.splitTextToSize(summary, 180);
      pdf.text(splitSummary, 15, 100);
      
      let currentY = 100 + splitSummary.length * 5;
      
      // Function to add new page
      const addNewPage = () => {
        pageNum++;
        pdf.addPage();
        createPageTemplate(pdf, pageNum);
        return 50; // Return new Y position after header
      };
      
      // Tour Highlights
      if (tourData.highlights && tourData.highlights.length > 0) {
        // Check if we need a new page
        if (currentY > 240) {
          currentY = addNewPage();
        } else {
          currentY += 10;
        }
        
        pdf.setTextColor(51, 102, 153); // Primary color for headings
        pdf.setFontSize(12);
        pdf.text("Tour Highlights", 15, currentY);
        
        // Add decorative line below heading
        pdf.setDrawColor(144, 41, 35); // #902923 - accent color
        pdf.setLineWidth(0.5);
        pdf.line(15, currentY + 2, 50, currentY + 2);
        
        currentY += 10;
        
        pdf.setTextColor(0); // Back to black for content
        tourData.highlights.forEach((highlight, index) => {
          // Check if we need a new page
          if (currentY > 270) {
            currentY = addNewPage();
          }
          
          pdf.setFontSize(10);
          const splitHighlight = pdf.splitTextToSize(`• ${highlight}`, 180);
          pdf.text(splitHighlight, 15, currentY);
          currentY += splitHighlight.length * 5 + 2;
        });
      }
      
      // Itinerary
      // Check if we need a new page
      if (currentY > 240) {
        currentY = addNewPage();
      } else {
        currentY += 10;
      }
      
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(14);
      pdf.text("Itinerary", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black for content
      tourData.itinerary.forEach((day, index) => {
        // Check if we need a new page
        if (currentY > 250) {
          currentY = addNewPage();
        }
        
        pdf.setFontSize(11);
        pdf.setTextColor(144, 41, 35); // Accent color for day titles
        pdf.text(`Day ${day.day}: ${day.title}`, 15, currentY);
        currentY += 7;
        
        pdf.setTextColor(0); // Back to black for description
        pdf.setFontSize(10);
        const splitDesc = pdf.splitTextToSize(day.description, 180);
        pdf.text(splitDesc, 15, currentY);
        currentY += splitDesc.length * 5 + 5;
      });
      
      // Inclusions & Exclusions
      // Check if we need a new page for Inclusions
      if (currentY > 240) {
        currentY = addNewPage();
      } else {
        currentY += 10;
      }
      
      // Inclusions
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(12);
      pdf.text("Inclusions", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black for content
      tourData.inclusions.forEach((item) => {
        // Check if we need a new page
        if (currentY > 270) {
          currentY = addNewPage();
        }
        
        pdf.setFontSize(10);
        const splitInclusion = pdf.splitTextToSize(`• ${item}`, 180);
        pdf.text(splitInclusion, 15, currentY);
        currentY += splitInclusion.length * 5 + 2;
      });
      
      // Check if we need a new page for Exclusions
      if (currentY > 240) {
        currentY = addNewPage();
      } else {
        currentY += 10;
      }
      
      // Exclusions
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(12);
      pdf.text("Exclusions", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black for content
      tourData.exclusions.forEach((item) => {
        // Check if we need a new page
        if (currentY > 270) {
          currentY = addNewPage();
        }
        
        pdf.setFontSize(10);
        const splitExclusion = pdf.splitTextToSize(`• ${item}`, 180);
        pdf.text(splitExclusion, 15, currentY);
        currentY += splitExclusion.length * 5 + 2;
      });
      
      // Contact Information - always on a new page
      currentY = addNewPage();
      
      pdf.setTextColor(51, 102, 153); // Primary color for headings
      pdf.setFontSize(14);
      pdf.text("Contact Us", 15, currentY);
      
      // Add decorative line below heading
      pdf.setDrawColor(144, 41, 35); // #902923 - accent color
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY + 2, 40, currentY + 2);
      
      currentY += 10;
      
      pdf.setTextColor(0); // Back to black
      pdf.setFontSize(10);
      pdf.text("For bookings and inquiries, please contact:", 15, currentY);
      currentY += 10;
      
      pdf.setFontSize(10);
      pdf.setTextColor(0);
      pdf.text("Best Sri Lanka Tours", 15, currentY); currentY += 5;
      pdf.text("Email: info@bestsrilankatours.com", 15, currentY); currentY += 5;
      pdf.text("Phone: +94 77 123 4567", 15, currentY); currentY += 5;
      pdf.text("Website: www.bestsrilankatours.com", 15, currentY);
      
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
