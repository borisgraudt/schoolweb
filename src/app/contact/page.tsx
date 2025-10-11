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
    <main className="min-h-screen bg-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
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
            {/* Форма */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">ФИО поступающего</label>
                  <input
                    {...register('applicantName')}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-black"
                    placeholder="Иванов Иван Иванович"
                  />
                  {errors.applicantName && <p className="text-red-600 text-sm mt-2">{errors.applicantName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Класс (5-11)</label>
                  <input
                    type="number"
                    min="5"
                    max="11"
                    {...register('class', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-black"
                    placeholder="9"
                  />
                  {errors.class && <p className="text-red-600 text-sm mt-2">{errors.class.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">ФИО родителя</label>
                  <input
                    {...register('parentName')}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-black"
                    placeholder="Иванова Мария Петровна"
                  />
                  {errors.parentName && <p className="text-red-600 text-sm mt-2">{errors.parentName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Телефон</label>
                  <input
                    {...register('phone')}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-black"
                    placeholder="+7 (999) 999 99 99"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-2">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Email</label>
                  <input
                    {...register('email')}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-black"
                    placeholder="example@mail.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-center font-bold"
                  >
                    ✓ Заявка успешно отправлена!
                  </motion.p>
                )}

                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 text-center font-bold"
                  >
                    ✗ Ошибка отправки. Попробуйте снова.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-4 border-black py-6 px-8 lg:px-16 bg-black text-white">
        <div className="text-center">
          <a 
            href="https://github.com/borisgraudt" 
            target="_blank" 
            className="inline-block font-bold text-xs tracking-widest hover:blur-sm transition-all duration-300"
          >
            made by boris
          </a>
        </div>
      </footer>
    </main>
  );
}
