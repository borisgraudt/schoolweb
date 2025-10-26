'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли уже согласие в localStorage
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Показываем баннер через небольшую задержку
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
    setConsentGiven(true);
    
    // Перезагружаем страницу для активации аналитики
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
    setConsentGiven(false);
  };

  const handleManage = () => {
    // Открываем модальное окно с настройками cookies
    // Пока просто принимаем все
    handleAccept();
  };

  if (consentGiven) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-black p-6 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">
                  🍪 Мы используем cookies
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Мы используем cookies для улучшения работы сайта, аналитики посещений 
                  и персонализации контента. Продолжая использовать сайт, вы соглашаетесь 
                  с нашей{' '}
                  <Link 
                    href="/privacy" 
                    className="underline hover:no-underline font-bold"
                    target="_blank"
                  >
                    Политикой конфиденциальности
                  </Link>
                  .
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm font-bold uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-all"
                >
                  Отклонить
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleManage}
                  className="px-4 py-2 text-sm font-bold uppercase tracking-widest border-2 border-gray-400 text-gray-600 hover:border-black hover:text-black transition-all"
                >
                  Настройки
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  className="px-6 py-2 text-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-all"
                >
                  Принять все
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
