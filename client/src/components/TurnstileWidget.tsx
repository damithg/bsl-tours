import { useEffect, useRef } from 'react';

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onExpired?: () => void;
  onError?: () => void;
  className?: string;
}

export const TurnstileWidget = ({ 
  onSuccess, 
  onExpired, 
  onError, 
  className = "" 
}: TurnstileWidgetProps) => {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const callbacksSetRef = useRef(false);

  useEffect(() => {
    // Only set up callbacks once
    if (!callbacksSetRef.current) {
      // Set up global callback functions
      (window as any).onTurnstileSuccess = (token: string) => {
        onSuccess(token);
      };
      
      (window as any).onTurnstileExpired = () => {
        if (onExpired) onExpired();
      };
      
      (window as any).onTurnstileError = () => {
        if (onError) onError();
      };
      
      callbacksSetRef.current = true;
    }

    // Load Cloudflare Turnstile script if not already loaded
    if (!document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      // Clean up global callbacks when component unmounts
      if (callbacksSetRef.current) {
        delete (window as any).onTurnstileSuccess;
        delete (window as any).onTurnstileExpired;
        delete (window as any).onTurnstileError;
        callbacksSetRef.current = false;
      }
    };
  }, [onSuccess, onExpired, onError]);

  const resetWidget = () => {
    if ((window as any).turnstile && turnstileRef.current) {
      (window as any).turnstile.reset(turnstileRef.current);
    }
  };

  // Expose reset function for parent components
  useEffect(() => {
    if (turnstileRef.current) {
      (turnstileRef.current as any).resetTurnstile = resetWidget;
    }
  }, []);

  return (
    <div className={`turnstile-container ${className}`}>
      <label className="block text-base font-medium font-['Raleway'] text-gray-700 mb-2">
        Security Verification *
      </label>
      <div 
        ref={turnstileRef}
        className="cf-turnstile" 
        data-sitekey="0x4AAAAAABfWL_H_a0x_xqoE"
        data-callback="onTurnstileSuccess"
        data-expired-callback="onTurnstileExpired"
        data-error-callback="onTurnstileError"
      ></div>
      <p className="mt-1 text-sm text-gray-500">Please complete the security verification above</p>
    </div>
  );
};

export default TurnstileWidget;