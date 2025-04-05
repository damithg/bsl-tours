import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Printer } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import EmailPdfDialog from './EmailPdfDialog';
import { generatePdfAsync, downloadPdfFromDataUrl } from '@/utils/pdfWorker';
import { toast } from '@/hooks/use-toast';
import type { TourData } from '@/types/tour';

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
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(initialIsGenerating);
  
  // Generate the PDF in a non-blocking way
  const generatePdf = (
    onComplete: (pdfDataUrl: string, filename: string) => void
  ) => {
    setIsGenerating(true);
    
    const formattedPrice = formatPrice(tourData.startingFrom, { currency: tourData.currency });
    
    generatePdfAsync(
      tourData,
      formattedPrice,
      (pdfDataUrl: string, filename: string) => {
        setIsGenerating(false);
        onComplete(pdfDataUrl, filename);
      },
      (error: string) => {
        console.error('Error generating PDF:', error);
        toast({
          title: 'PDF Generation Failed',
          description: 'There was an error generating the PDF. Please try again.',
          variant: 'destructive'
        });
        setIsGenerating(false);
      }
    );
  };
  
  const handleDownloadPDF = () => {
    console.log("Download PDF button clicked");
    
    // Show a user-friendly message
    toast({
      title: 'Generating PDF',
      description: 'Your PDF is being prepared and will download automatically when ready.',
    });
    
    generatePdf((pdfDataUrl, filename) => {
      // Download the PDF
      downloadPdfFromDataUrl(pdfDataUrl, filename);
      
      toast({
        title: 'PDF Ready',
        description: 'Your PDF has been downloaded successfully!',
      });
    });
  };
  
  const handlePrintPDF = () => {
    console.log("Print PDF button clicked");
    
    // Show a user-friendly message
    toast({
      title: 'Preparing for Print',
      description: 'Your PDF is being prepared and will open in a new window for printing.',
    });
    
    generatePdf((pdfDataUrl, filename) => {
      // Open PDF in new window/tab and print
      const pdfWindow = window.open('');
      if (pdfWindow) {
        pdfWindow.document.write(`
          <iframe 
            width="100%" 
            height="100%" 
            src="${pdfDataUrl}" 
            onload="setTimeout(function() { this.contentWindow.print(); }, 1000)">
          </iframe>
        `);
        pdfWindow.document.close();
      } else {
        toast({
          title: 'Popup Blocked',
          description: 'Please allow popups to print the PDF.',
          variant: 'destructive'
        });
      }
    });
  };
  
  const handleEmailPDF = () => {
    console.log("Email PDF button clicked");
    setIsEmailDialogOpen(true);
  };
  
  // Generate PDF content for email
  const generatePdfContent = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const formattedPrice = formatPrice(tourData.startingFrom, { currency: tourData.currency });
      
      generatePdfAsync(
        tourData,
        formattedPrice,
        (pdfDataUrl: string, filename: string) => {
          resolve(pdfDataUrl);
        },
        (error: string) => {
          console.error('Error generating PDF for email:', error);
          reject(error);
        }
      );
    });
  };
  
  return (
    <div ref={contentRef} className="print:hidden">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          onClick={handleDownloadPDF} 
          disabled={isGenerating}
          className="flex items-center gap-1"
          variant="outline"
        >
          <Download className="w-4 h-4 mr-1" />
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
        
        <Button 
          onClick={handlePrintPDF} 
          disabled={isGenerating}
          className="flex items-center gap-1"
          variant="outline"
        >
          <Printer className="w-4 h-4 mr-1" />
          {isGenerating ? 'Preparing...' : 'Print PDF'}
        </Button>
        
        <Button 
          onClick={handleEmailPDF} 
          disabled={isGenerating}
          className="flex items-center gap-1"
          variant="outline"
        >
          <Mail className="w-4 h-4 mr-1" />
          {isGenerating ? 'Preparing...' : 'Email PDF'}
        </Button>
      </div>
      
      <EmailPdfDialog 
        tourData={tourData}
        isOpen={isEmailDialogOpen}
        setIsOpen={setIsEmailDialogOpen}
        generatePdfContent={generatePdfContent}
      />
    </div>
  );
};

export default TourPDFGenerator;