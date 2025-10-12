'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/contactSchema';
import type { ContactFormData } from '@/lib/contactSchema';
import Link from 'next/link';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    let numbers = cleanedValue;
    if (numbers.startsWith('7') || numbers.startsWith('8')) {
      numbers = numbers.substring(1);
    }
    numbers = numbers.substring(0, 10);

    let formattedNumber = '+7';
    if (numbers.length > 0) {
      formattedNumber += ` (${numbers.substring(0, 3)}`;
    }
    if (numbers.length > 3) {
      formattedNumber += `) ${numbers.substring(3, 6)}`;
    }
    if (numbers.length > 6) {
      formattedNumber += ` ${numbers.substring(6, 8)}`;
    }
    if (numbers.length > 8) {
      formattedNumber += ` ${numbers.substring(8, 10)}`;
    }
    return formattedNumber.trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight uppercase">НЕОРДИНАТА</Link>
          <Link href="/" className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity">
            На главную
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm uppercase tracking-widest"
              >
                Contact
              </motion.h2>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              >
                Записаться
              </motion.h1>
            </div>
          </div>

          <div className="border-t-4 border-black pt-12">
            {submitStatus === 'success' ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto text-center py-20"
              >
                <div className="mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-9xl mb-8"
                  >
                    ✓
                  </motion.div>
                  <h2 className="text-5xl sm:text-6xl font-bold mb-6 uppercase tracking-tight">
                    Заявка отправлена!
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
                    Спасибо за ваш интерес к нашей школе. Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="px-8 py-4 bg-black text-white uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    На главную
                  </Link>
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      reset();
                    }}
                    className="px-8 py-4 border-2 border-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                  >
                    Новая заявка
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Форма */
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">ФИО поступающего</label>
                  <input
                    {...register('applicantName')}
                    className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors ${
                      errors.applicantName 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-black focus:border-black hover:border-gray-600'
                    }`}
                    placeholder="Иванов Иван Иванович"
                  />
                  {errors.applicantName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-2 font-bold"
                    >
                      {errors.applicantName.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Класс (5-11)</label>
                  <input
                    type="number"
                    min="5"
                    max="11"
                    {...register('class', { valueAsNumber: true })}
                    className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors ${
                      errors.class 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-black focus:border-black hover:border-gray-600'
                    }`}
                    placeholder="9"
                  />
                  {errors.class && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-2 font-bold"
                    >
                      {errors.class.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">ФИО родителя</label>
                  <input
                    {...register('parentName')}
                    className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors ${
                      errors.parentName 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-black focus:border-black hover:border-gray-600'
                    }`}
                    placeholder="Иванова Мария Петровна"
                  />
                  {errors.parentName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-2 font-bold"
                    >
                      {errors.parentName.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Телефон</label>
                  <input
                    {...register('phone')}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors ${
                      errors.phone 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-black focus:border-black hover:border-gray-600'
                    }`}
                    placeholder="+7 (999) 999 99 99"
                  />
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-2 font-bold"
                    >
                      {errors.phone.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Email</label>
                  <input
                    {...register('email')}
                    className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors ${
                      errors.email 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-black focus:border-black hover:border-gray-600'
                    }`}
                    placeholder="example@mail.com"
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-2 font-bold"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Отправка...
                    </span>
                  ) : (
                    'Отправить заявку'
                  )}
                </motion.button>

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="border-4 border-red-600 bg-red-50 p-6 text-center"
                  >
                    <p className="text-red-600 font-bold text-xl uppercase tracking-widest">
                      ✗ Ошибка отправки
                    </p>
                    <p className="text-red-700 text-sm mt-2">
                      Попробуйте снова или напишите нам напрямую
                    </p>
                  </motion.div>
                )}
              </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-4 border-black py-6 px-8 lg:px-16 bg-black text-white">
        <div className="text-center space-y-2">
          <a 
            href="https://github.com/borisgraudt" 
            target="_blank" 
            className="inline-block font-bold text-xs tracking-widest hover:blur-sm transition-all duration-300"
          >
            by aethr
          </a>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Неордината. Все права защищены.
          </p>
        </div>
      </footer>
    </main>
  );
}
