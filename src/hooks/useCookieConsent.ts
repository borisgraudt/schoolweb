'use client';

import { useState, useEffect } from 'react';

export type CookieConsentStatus = 'accepted' | 'declined' | 'pending';

export function useCookieConsent() {
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>('pending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent') as CookieConsentStatus;
    if (consent === 'accepted' || consent === 'declined') {
      setConsentStatus(consent);
    }
    setIsLoading(false);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setConsentStatus('accepted');
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setConsentStatus('declined');
  };

  const resetConsent = () => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    setConsentStatus('pending');
  };

  const hasConsent = consentStatus === 'accepted';
  const hasDeclined = consentStatus === 'declined';
  const needsConsent = consentStatus === 'pending';

  return {
    consentStatus,
    isLoading,
    hasConsent,
    hasDeclined,
    needsConsent,
    acceptCookies,
    declineCookies,
    resetConsent,
  };
}
