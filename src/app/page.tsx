'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import teachers from '@/lib/teachers';
import { useState } from 'react';
import TeachersCarousel from '@/components/TeachersCarousel';
import Typewriter from '@/components/Typewriter';
import FadeInTypewriter from '@/components/FadeInTypewriter';
import MessageTyping from '@/components/MessageTyping';

export default function Home() {
  const [pixelate, setPixelate] = useState(false);
  const [hoveredTeacherDescription, setHoveredTeacherDescription] = useState<string | null>(null);
  const [clickedTeacherDescription, setClickedTeacherDescription] = useState<string | null>(null);
  const [clickedTeacherName, setClickedTeacherName] = useState<string | null>(null);

  const handleTeacherHover = (description: string | null) => {
    setHoveredTeacherDescription(description);
  };

  const handleTeacherClick = (description: string, name: string) => {
    if (clickedTeacherName === name) {
      setClickedTeacherDescription(null);
      setClickedTeacherName(null);
    } else {
      setClickedTeacherDescription(description);
      setClickedTeacherName(name);
    }
  };

  const displayedDescription = clickedTeacherDescription || hoveredTeacherDescription;

  return (
    <main className="min-h-screen bg-bauhaus-light font-body overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] bg-bauhaus-light overflow-hidden flex flex-col items-center justify-center">
        {/* Текст "неордината" */}
        <div className="flex items-center justify-center z-30">
          <div className="w-full px-4 sm:px-8 md:px-16">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-bauhaus-green text-[clamp(30px,15vw,245px)] sm:text-[clamp(50px,30vw,245px)] md:text-[clamp(60px,40vw,245px)] font-bold leading-none tracking-tightest drop-shadow-2xl text-center w-full"
            >
              Неордината
            </motion.h1>
          </div>
        </div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-bauhaus-blue relative z-10 container mx-auto mt-8 sm:mt-12 px-4 sm:px-0"
        >
          <p className="text-base sm:text-lg mb-8 sm:mb-12 text-bauhaus-green font-bold font-['Helvetica',_sans-serif] whitespace-pre-line">
            Место, где знания встречаются со свободой, а обучение<br/>становится осознанным выбором. Мы вдохновляем думать,<br/>открывать новое и быть собой. Здесь каждый — больше,<br/>чем просто ученик.
          </p>
          <motion.div>
            <Link
              href="/contact"
              className="text-bauhaus-green text-base sm:text-lg font-semibold hover:underline transition-opacity inline-block"
            >
              ЗАПИСАТЬСЯ
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Activity Section */}
      <section className="bg-bauhaus-light py-20 relative overflow-hidden md:min-h-[700px]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-start justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 md:pl-12 relative z-10"
          >
            <h2 className="text-4xl font-bold text-bauhaus-blue mb-6">Проектная деятельность</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Сегодня прошла постерная сессия по проектам! Ребята из 5-10 классов предметным проверочным результаты своих проектов друг другу и всем желающим.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Следующей важный этап — проектная конференция в конце мая, где ребята расскажут об итогах слова работы.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0 relative h-[400px] lg:h-[600px]"
          >
            {/* This is the green block that needs to be positioned like in the mockup */}
            <div className="bg-bauhaus-green w-[375px] h-[350px] ml-4 md:ml-0 md:w-[400px] md:h-[450px] lg:w-[575px] lg:h-[400px] md:absolute md:top-24 md:left-0 md:translate-x-0 md:translate-y-0"></div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <section className="bg-bauhaus-light py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/about" className="text-bauhaus-green text-lg font-semibold hover:underline transition-opacity">
              О нас
            </Link>
            <Link href="/events" className="text-bauhaus-green text-lg font-semibold hover:underline transition-opacity">
              События
            </Link>
            <Link href="/teachers" className="text-bauhaus-green text-lg font-semibold hover:underline transition-opacity">
              Учителя
            </Link>
            <Link href="/contact" className="text-bauhaus-green text-lg font-semibold hover:underline transition-opacity">
              Контакты
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - "Наша школа" */}
      <section className="relative bg-bauhaus-green text-white py-20 px-4">
        <div className="container mx-auto relative">
          <div className="absolute top-[-96px] left-0 w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-full flex flex-col items-start">
            <MessageTyping
              text={'"Наш центр — это пространство знаний, диалога и\nсамовыражения. Мы верим в образование, которое не\nпросто дает знания, а учит думать, выбирать, осознавать\nсебя и мир вокруг. Здесь каждый ученик — личность,\nа не часть системы. Мы создаем атмосферу уважения\nи свободы, где академические достижения идут рука\nоб руку с творчеством, рефлексией и радостью открытия."'}
              className="font-normal text-left text-[clamp(1.1rem,4.5vw,42px)] mt-40"
            />
            <div className="h-8"></div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="bg-bauhaus-light pt-80 pb-[350px]">
        <div className="container mx-auto px-4 sm:px-8 md:px-16">
          {/* Карусель учителей */}
          <TeachersCarousel onTeacherHover={handleTeacherHover} onTeacherClick={handleTeacherClick} />
          <div className={`text-lg font-['Helvetica',_sans-serif] max-w-4xl mx-auto overflow-hidden transition-all duration-1000 ${displayedDescription ? 'opacity-100 max-h-[1000px] mt-24' : 'opacity-0 max-h-0 mt-0'}`}>
            {/* Using dangerouslySetInnerHTML to render bold tags from description */} 
            <div className="text-left w-full" dangerouslySetInnerHTML={{ __html: displayedDescription || '' }} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-bauhaus-light pt-0 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-bauhaus-blue"
          >
            <h2 className="font-body text-[80px] font-bold mb-32 text-bauhaus-green">Контакты</h2>
            <div className="font-body text-[30px] font-bold mb-4 text-bauhaus-green">
              Телефон: <a href="tel:+79858757592" className="hover:underline">+7 985 875-75-92</a>
            </div>
            <div className="font-body text-[30px] font-bold mb-4 text-bauhaus-green">
              Почта: <a href="mailto:neordinata@ya.ru" className="hover:underline">neordinata@ya.ru</a>
            </div>
            <div className="font-body text-[30px] font-bold mb-32 text-bauhaus-green">
              Адрес: <a href="https://yandex.ru/maps/-/CHSL4IkK" target="_blank" rel="noopener noreferrer" className="hover:underline">Москва, ул. Косыгина 13, п. 3</a>
            </div>
            <div className="flex space-x-8 justify-center md:justify-start z-40 mb-256">
              <Link href="https://t.me/neordinata_public" className="text-bauhaus-blue hover:opacity-80 transition-opacity">
                <Image src="/images/telegram.png" alt="Telegram" width={50} height={50} />
              </Link>
              <Link href="https://vk.com/neordinata" className="text-bauhaus-blue hover:opacity-80 transition-opacity">
                <Image src="/images/vk.png" alt="VK" width={50} height={50} />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0 relative h-[400px] lg:h-[600px]"
          >
            <iframe 
              className="w-[375px] h-[300px] ml-4 md:ml-0 md:w-[400px] md:h-[400px] lg:w-[575px] lg:h-[400px] md:absolute md:top-48 md:right-0 md:left-auto md:translate-x-0 md:translate-y-0 border-2 border-bauhaus-green"
              src="https://yandex.ru/map-widget/v1/?ll=37.565164%2C55.704210&mode=search&oid=113657524855&ol=biz&z=16.48" 
              frameBorder="1" 
              allowFullScreen={true}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bauhaus-light text-black py-8 px-4 text-center text-sm relative w-full font-bold font-sans">
        <div className="container mx-auto text-center">
          <a
            href="https://github.com/borisgraudt"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setPixelate(true)}
            onMouseLeave={() => setPixelate(false)}
            style={pixelate ? { filter: 'blur(1.5px) contrast(200%)' } : {}}
            className="transition-all duration-300 mt-8 inline-block"
          >
            made by boris
          </a>
        </div>
      </footer>
    </main>
  );
}
