'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/contactSchema';
import type { ContactFormData } from '@/lib/contactSchema';

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
    const cleanedValue = value.replace(/\D/g, ''); // Извлекаем только цифры

    // Если ввод начинается с 7 или 8, убираем их для единообразного форматирования с +7
    let numbers = cleanedValue;
    if (numbers.startsWith('7') || numbers.startsWith('8')) {
        numbers = numbers.substring(1);
    }
    
    // Ограничиваем до 10 цифр для формата XXX XXX XX XX
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
    <main className="min-h-screen bg-bauhaus-light py-20 px-4 flex items-center justify-center font-body">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full mx-auto p-8 bg-bauhaus-white rounded-xl shadow-lg"
      >
        <h2 className="text-4xl font-bold text-bauhaus-green mb-8 text-center">Записаться</h2>

        <div className="mb-4">
          <label htmlFor="applicantName" className="block text-bauhaus-green text-sm font-bold mb-2">ФИО поступающего:</label>
          <input
            id="applicantName"
            type="text"
            {...register('applicantName')}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-bauhaus-red"
            placeholder="ФИО поступающего"
          />
          {errors.applicantName && <p className="text-bauhaus-red text-xs italic mt-1">{errors.applicantName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="class" className="block text-bauhaus-green text-sm font-bold mb-2">Класс (5-11):</label>
          <input
            id="class"
            type="number"
            min="5"
            max="11"
            {...register('class', { valueAsNumber: true })}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-bauhaus-red"
            placeholder="Класс"
          />
          {errors.class && <p className="text-bauhaus-red text-xs italic mt-1">{errors.class.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="parentName" className="block text-bauhaus-green text-sm font-bold mb-2">ФИО родителя:</label>
          <input
            id="parentName"
            type="text"
            {...register('parentName')}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-bauhaus-red"
            placeholder="ФИО родителя"
          />
          {errors.parentName && <p className="text-bauhaus-red text-xs italic mt-1">{errors.parentName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-bauhaus-green text-sm font-bold mb-2">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-bauhaus-red"
            placeholder="Ваш Email"
          />
          {errors.email && <p className="text-bauhaus-red text-xs italic mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-bauhaus-green text-sm font-bold mb-2">Номер телефона:</label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            onChange={handlePhoneChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-bauhaus-red"
            placeholder="+7 (XXX) XXX XX XX"
          />
          {errors.phone && <p className="text-bauhaus-red text-xs italic mt-1">{errors.phone.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="source" className="block text-bauhaus-green text-sm font-bold mb-2">Откуда узнали о школе:</label>
          <input
            id="source"
            type="text"
            {...register('source')}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-bauhaus-red"
            placeholder="Откуда узнали о школе"
          />
          {errors.source && <p className="text-bauhaus-red text-xs italic mt-1">{errors.source.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className="bg-bauhaus-green text-bauhaus-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors w-full"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </motion.button>

        {submitStatus === 'success' && (
          <p className="text-bauhaus-green text-center mt-4 font-bold">Сообщение успешно отправлено!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-bauhaus-red text-center mt-4 font-bold">Ошибка при отправке. Пожалуйста, попробуйте еще раз.</p>
        )}
      </motion.form>
    </main>
  );
} 