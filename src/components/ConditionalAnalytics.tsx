'use client';

import { useEffect, useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function ConditionalAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Проверяем согласие на cookies
    const consent = localStorage.getItem('cookie-consent');
    setHasConsent(consent === 'accepted');
  }, []);

  // Vercel Analytics - всегда загружаем (не использует cookies)
  // Google Analytics - только с согласием
  return (
    <>
      <Analytics />
      {hasConsent && process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </>
  );
}
