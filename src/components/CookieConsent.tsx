import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const COOKIE_CONSENT_KEY = 'skycapital-cookie-consent';
const VISITOR_ID_KEY = 'skycapital-visitor-id';

// Generate a unique visitor ID
function getOrCreateVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsentToSupabase = async (status: 'accepted' | 'declined') => {
    try {
      const visitorId = getOrCreateVisitorId();
      
      // Store consent in Supabase for compliance tracking
      const { error } = await supabase
        .from('cookie_consents')
        .insert({
          visitor_id: visitorId,
          consent_status: status,
          user_agent: navigator.userAgent,
        });

      if (error) {
        console.error('Failed to save cookie consent:', error);
      }
    } catch (err) {
      console.error('Error saving cookie consent:', err);
    }
  };

  const handleAccept = async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    await saveConsentToSupabase('accepted');
  };

  const handleDecline = async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    await saveConsentToSupabase('declined');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-500">
      <div className="container">
        <div className="bg-card border border-border rounded-2xl shadow-elevated p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icon */}
          <div className="hidden md:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
            <Cookie className="h-6 w-6 text-primary" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-1">
              We value your privacy
            </h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.{' '}
              <a 
                href="/privacy" 
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Learn more
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1 md:flex-none"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 md:flex-none"
            >
              Accept All
            </Button>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
