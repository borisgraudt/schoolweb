'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { href: '/', label: 'Главная' },
    { href: '/projects', label: 'Проекты' },
    { href: '/contact', label: 'Записаться' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-studio-dark/95 backdrop-blur-sm' 
            : 'bg-studio-dark/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="z-50 text-white hover:text-studio-red transition-colors" 
              onClick={closeMenu}
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em'
              }}
            >
              НЕОРДИНАТА
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-studio-red font-medium text-base transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5 bg-studio-red' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5 bg-studio-red' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-studio-dark z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full px-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  className="mb-10"
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="text-white hover:text-studio-red transition-colors duration-200 font-bold text-4xl uppercase"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

