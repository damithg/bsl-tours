import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { TourData } from '@/types/tour';

interface EmailPdfDialogProps {
  tourData: TourData;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  generatePdfContent: () => Promise<string | null>;
}

const EmailPdfDialog: React.FC<EmailPdfDialogProps> = ({
  tourData,
  isOpen,
  setIsOpen,
  generatePdfContent
}) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when email changes
    if (errorMessage) setErrorMessage("");
  };
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setErrorMessage("Please enter an email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    
    setIsSending(true);
    
    try {
      // Show a toast to indicate we're generating the PDF
      toast({
        title: "Preparing PDF",
        description: "Generating tour PDF document...",
      });
      
      // Generate PDF content
      const pdfContent = await generatePdfContent();
      
      if (!pdfContent) {
        throw new Error("Failed to generate PDF content");
      }
      
      // Send to server
      const response = await fetch('/api/tours/email-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tourName: tourData.name,
          pdfContent,
          filename: `${tourData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }
      
      // Success
      toast({
        title: "Email Sent",
        description: `Tour details have been sent to ${email}`,
      });
      
      // Close dialog and reset state
      setIsOpen(false);
      setEmail("");
    } catch (error: any) {
      console.error("Error sending email:", error);
      setErrorMessage(error.message || "Failed to send email. Please try again.");
      
      toast({
        title: "Email Failed",
        description: "There was a problem sending the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Tour Information</DialogTitle>
          <DialogDescription>
            Enter your email to receive details about {tourData.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={handleEmailChange}
                className={errorMessage ? "border-red-500" : ""}
              />
              {errorMessage && (
                <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSending}
              className="w-full sm:w-auto"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send to Email"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailPdfDialog;