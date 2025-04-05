import type { TourData } from '@/types/tour';
import { jsPDF } from 'jspdf';

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

// Generate PDF in a non-blocking way
export function generatePdfAsync(
  tourData: TourData, 
  formattedPrice: string,
  onComplete: (pdfDataUrl: string, filename: string) => void,
  onError: (error: string) => void
) {
  // Use setTimeout to prevent UI blocking
  setTimeout(() => {
    try {
      // Create new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get content for PDF
      const tourName = tourData.name;
      const duration = tourData.duration;
      const price = formattedPrice;
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
      if (tourData.highlights && Array.isArray(tourData.highlights) && tourData.highlights.length > 0) {
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
      if (tourData.itinerary && Array.isArray(tourData.itinerary)) {
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
      }
      
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
      if (tourData.inclusions && Array.isArray(tourData.inclusions)) {
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
      }
      
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
      if (tourData.exclusions && Array.isArray(tourData.exclusions)) {
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
      }
      
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
      
      // Get the PDF as a data URL
      const pdfOutput = pdf.output('datauristring');
      const filename = `${tourData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      
      // Send the PDF data back via callback
      onComplete(pdfOutput, filename);
    } catch (error: any) {
      // Send error back via callback
      onError(error.message || 'Unknown error occurred during PDF generation');
    }
  }, 50); // Short timeout to let UI update
}

// Helper to download PDF from data URL
export function downloadPdfFromDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}