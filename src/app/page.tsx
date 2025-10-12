'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import FAQItem from '@/components/FAQItem';

const teachers = [
  { 
    name: 'Мария Алексеевна', 
    subject: 'Биология', 
    selfBio: 'Биология — это не только не страшно, но ещё и жутко интересно и полезно. Спонтанно мы занимаемся её изучением и применением в жизни буквально каждый день, а мне хочется сделать её немного более понятной и близкой. Бешеной собаке семь вёрст не крюк: занимаюсь помощью диким животным, играю в ролевые игры живого действия, организую лекции и мастер-классы, работаю параллельно в зоологическом музее родной alma mater.',
    directorBio: 'Мария Алексеевна - биолог. И поэтому в школе можно подержать на ладошке летучую мышь, ловить сбежавшего ежа...А еще можно раскрыв рот слушать ее уроки. От 5 до 11 класса слушать Марию Алексеевну любят все. И ей есть что рассказать. Ведь она волонтер, помогающий диким животным, сотрудник музея. А еще - веселый, спокойный и легкий на подъем человек.',
    color: '#10b981', 
    image: '/images/maria.png' 
  },
  { name: 'Анна Петрова', subject: 'Математика', selfBio: 'Преподаю математику уже 10 лет...', directorBio: 'Анна - мастер объяснения...', color: '#ef4444', image: '/images/anna.png' },
  { name: 'Дарья Иванова', subject: 'Физика', selfBio: 'Физика - это магия...', directorBio: 'Дарья умеет зажечь...', color: '#3b82f6', image: '/images/dasha.png' },
  { name: 'Ирина Сидорова', subject: 'Химия', selfBio: 'Химия вокруг нас...', directorBio: 'Ирина - настоящий алхимик...', color: '#8b5cf6', image: '/images/irina.png' },
  { name: 'Татьяна Кузнецова', subject: 'История', selfBio: 'История - это живые истории...', directorBio: 'Татьяна оживляет прошлое...', color: '#f59e0b', image: '/images/tatiana.png' },
  { name: 'Елена Новикова', subject: 'Английский', selfBio: 'English is fun...', directorBio: 'Елена - носитель культуры...', color: '#06b6d4', image: '/images/elena.png' },
];

const eventPhotos = [
  '/images/event1.jpg',
  '/images/event2.jpg',
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentEventPhoto, setCurrentEventPhoto] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [showSelfBio, setShowSelfBio] = useState(true);
  const [loadedTeachers, setLoadedTeachers] = useState(teachers);
  const [loadedEventData, setLoadedEventData] = useState({ 
    title: 'Проектная деятельность',
    description: 'Сегодня прошла постерная сессия по проектам. Ребята из 5–10 классов представили результаты своих проектов друг другу и всем желающим.\n\nСледующий важный этап — проектная конференция в конце мая, где ребята расскажут об итогах своей работы.',
    photos: eventPhotos
  });

  useEffect(() => {
    // Устанавливаем флаг монтирования
    setMounted(true);
    
    // Загрузка данных из localStorage
    const savedTeachers = localStorage.getItem('teachers');
    const savedEvents = localStorage.getItem('eventData');
    
    if (savedTeachers) {
      try {
        setLoadedTeachers(JSON.parse(savedTeachers));
      } catch (e) {
        console.error('Error loading teachers:', e);
      }
    }
    
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        setLoadedEventData({
          title: parsed.title,
          description: parsed.description,
          photos: parsed.photos
        });
      } catch (e) {
        console.error('Error loading events:', e);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventPhoto((prev) => (prev + 1) % loadedEventData.photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [loadedEventData.photos.length]);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Grid overlay для Swiss design */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-black" />
          ))}
        </div>
      </div>

      {/* Slide 1 - Hero */}
      <section className="min-h-screen grid grid-cols-12 gap-0 relative overflow-hidden">
        <div className="col-span-12 lg:col-span-7 flex items-center px-6 sm:px-8 lg:px-16 py-20 relative">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-none">
                НЕОР­<br/>ДИНА­<br/>ТА
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-12 max-w-md leading-relaxed"
            >
              Место, где знания встречаются со свободой, а обучение становится осознанным выбором. Мы вдохновляем думать, открывать новое и быть собой. Здесь каждый — больше, чем просто ученик.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-[#ef4444] text-white px-12 py-4 text-sm uppercase tracking-widest hover:bg-black transition-colors"
              >
                Записаться
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero фото вместо красного блока */}
        <div className="col-span-12 lg:col-span-5 bg-gray-200 hidden lg:block relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-400">
            📷
          </div>
          {/* Placeholder для фото */}
        </div>
      </section>

      {/* Slide 2 - Events */}
      <section id="events" className="py-24 px-6 sm:px-8 lg:px-16 border-t-4 border-black">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-widest mb-4"
            >
              Events
            </motion.h2>
          </div>

          <div className="col-span-12 lg:col-span-8">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" suppressHydrationWarning>
                {loadedEventData.title}
              </h3>
              <div className="text-lg leading-relaxed text-gray-700 mb-8 whitespace-pre-line" suppressHydrationWarning>
                {loadedEventData.description}
              </div>

              {/* Carousel для фото события */}
              <div className="relative h-[400px] bg-gray-200 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEventPhoto}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {loadedEventData.photos[currentEventPhoto] ? (
                      <img 
                        src={loadedEventData.photos[currentEventPhoto]} 
                        alt={`Event ${currentEventPhoto + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400">
                        📸
                      </div>
                    )}
          </motion.div>
                </AnimatePresence>

                {/* Навигация carousel */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {loadedEventData.photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentEventPhoto(i)}
                      className={`w-2 h-2 transition-all ${
                        currentEventPhoto === i ? 'bg-black w-8' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
        </motion.div>
          </div>
        </div>
      </section>

      {/* Slide 3 - О нас */}
      <section className="py-24 px-6 sm:px-8 lg:px-16 bg-black text-white border-t-4 border-black">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-16 leading-relaxed"
          >
            «Наш центр — это пространство знаний, диалога и самовыражения. Мы верим в образование, которое не просто дает знания, а учит думать, выбирать, осознавать себя и мир вокруг. Здесь каждый ученик — личность, а не часть системы. Мы создаем атмосферу уважения и свободы, где академические достижения идут рука об руку с творчеством, рефлексией и радостью открытия.»
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 sm:px-0"
          >
            <a
              href="#events"
              className="bg-[#10b981] text-white text-center py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              События
            </a>
            <a
              href="#faq"
              className="bg-[#8b5cf6] text-white text-center py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contacts"
              className="bg-[#f59e0b] text-white text-center py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Контакты
            </a>
          </motion.div>
        </div>
      </section>

      {/* Slide 4 - Учителя (Интерактивный список) */}
      <section id="teachers" className="py-24 px-6 sm:px-8 lg:px-16 border-t-4 border-black">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-widest"
            >
              Команда
            </motion.h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold"
            >
              Наши учителя
            </motion.h3>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Левая часть - список учителей с прокруткой */}
          <div className="space-y-2 order-2 lg:order-1 max-h-[600px] overflow-y-auto">
            {loadedTeachers.map((teacher, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedTeacher(i)}
                className={`w-full text-left border-t-2 border-black py-4 px-4 transition-colors ${
                  selectedTeacher === i ? 'bg-black text-white' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-4 h-4 flex-shrink-0"
                    style={{ backgroundColor: selectedTeacher === i ? 'white' : teacher.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg truncate">{teacher.name}</h4>
                    <div className="text-xs uppercase tracking-widest opacity-60 truncate">
                      {teacher.subject}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
            <div className="border-t-2 border-black" />
          </div>

          {/* Правая часть - детали учителя */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTeacher}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Фото */}
                <div 
                  className="aspect-[4/3] mb-6 flex items-center justify-center text-6xl sm:text-8xl text-white mx-6 sm:mx-0 overflow-hidden"
                  style={{ backgroundColor: loadedTeachers[selectedTeacher].color }}
                >
                  {loadedTeachers[selectedTeacher].image ? (
                    <img 
                      src={loadedTeachers[selectedTeacher].image} 
                      alt={loadedTeachers[selectedTeacher].name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </div>

                {/* Переключатель "О себе" / "Глазами директора" */}
                <div className="flex gap-2 mb-6 mx-6 sm:mx-0">
                  <button
                    onClick={() => setShowSelfBio(true)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors border-2 border-black ${
                      showSelfBio ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                    }`}
                  >
                    О себе
                  </button>
                  <button
                    onClick={() => setShowSelfBio(false)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors border-2 border-black ${
                      !showSelfBio ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                    }`}
                  >
                    Глазами директора
                  </button>
                </div>

                {/* Текст */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showSelfBio ? 'self' : 'director'}
                    initial={{ opacity: 0, x: showSelfBio ? -15 : 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: showSelfBio ? 15 : -15 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.1, 0.25, 1],
                      opacity: { duration: 0.4 }
                    }}
                    className="text-base sm:text-lg leading-relaxed text-gray-700 mx-6 sm:mx-0"
                  >
                    {showSelfBio ? loadedTeachers[selectedTeacher].selfBio : loadedTeachers[selectedTeacher].directorBio}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Slide 5 - FAQ */}
      <section id="faq" className="py-24 px-6 sm:px-8 lg:px-16 border-t-4 border-black">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-widest"
            >
              FAQ
            </motion.h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold"
            >
              Частые вопросы
            </motion.h3>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              question: 'Как записаться в школу?',
              answer: 'Свяжитесь с нами по телефону +7 985 875-75-92 или email neordinata@ya.ru, и мы расскажем о всех этапах поступления.'
            },
            {
              question: 'Какие классы есть в школе?',
              answer: 'В нашей школе обучаются ученики с 5 по 11 класс. Мы предлагаем индивидуальный подход к каждому ребенку.'
            },
            {
              question: 'Проводятся ли дополнительные занятия?',
              answer: 'Да, мы организуем проектную деятельность, мастер-классы, лекции и другие образовательные мероприятия.'
            },
            {
              question: 'Где находится школа?',
              answer: 'Мы находимся в Москве по адресу: ул. Косыгина 13, п. 3. Удобная транспортная доступность.'
            }
          ].map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              delay={i * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Slide 6 - Контакты */}
      <section id="contacts" className="py-24 px-6 sm:px-8 lg:px-16 border-t-4 border-black bg-[#3b82f6] text-white">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-widest mb-8"
            >
              Контакты
            </motion.h2>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-sm uppercase tracking-widest mb-4 opacity-80">Телефон</div>
                <a href="tel:+79858757592" className="text-2xl font-bold hover:opacity-80 transition-opacity break-words">
                  +7 985 875-75-92
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-sm uppercase tracking-widest mb-4 opacity-80">Email</div>
                <a href="mailto:neordinata@ya.ru" className="text-2xl font-bold hover:opacity-80 transition-opacity break-words">
                  neordinata@ya.ru
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-sm uppercase tracking-widest mb-4 opacity-80">Адрес</div>
                <a href="https://yandex.ru/maps/-/CHSL4IkK" target="_blank" className="text-2xl font-bold hover:opacity-80 transition-opacity break-words">
                  Москва,<br/>ул. Косыгина 13, п. 3
                </a>
              </motion.div>

          <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="text-sm uppercase tracking-widest mb-4 opacity-80">Соцсети</div>
                <Link href="https://t.me/neordinata_public" target="_blank" className="block border-2 border-white text-white text-center py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-[#3b82f6] transition-colors">
                  Telegram
              </Link>
                <Link href="https://vk.com/neordinata" target="_blank" className="block border-2 border-white text-white text-center py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-[#3b82f6] transition-colors">
                  VK
              </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black py-6 px-8 lg:px-16 bg-black text-white">
        <div className="text-center space-y-2">
          <a
            href="https://github.com/borisgraudt"
            target="_blank"
            className="inline-block font-bold text-xs tracking-widest hover:blur-sm transition-all duration-300"
          >
            made by boris
          </a>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Неордината. Все права защищены.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f0f0f0;
        }

        ::-webkit-scrollbar-thumb {
          background: #000;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </main>
  );
}
