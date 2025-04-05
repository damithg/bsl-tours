import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from 'lucide-react';

interface EmailPdfDialogProps {
  tourName: string;
  onSendEmail: (recipientEmail: string) => Promise<void>;
  buttonLabel?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const EmailPdfDialog: React.FC<EmailPdfDialogProps> = ({
  tourName,
  onSendEmail,
  buttonLabel = "Email",
  buttonVariant = "outline"
}) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
      await onSendEmail(email);
      // Only close if successful
      setIsOpen(false);
      setEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant as any}
          className="w-full flex items-center justify-center"
        >
          <Mail className="mr-2 h-4 w-4" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Tour Information</DialogTitle>
          <DialogDescription>
            Enter your email to receive details about {tourName}.
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