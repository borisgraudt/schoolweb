'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-black py-6 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
            ← Главная
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold mb-8"
          >
            Политика конфиденциальности
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none space-y-6"
          >
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-0">
                <strong>Дата последнего обновления:</strong> {new Date().toLocaleDateString('ru-RU')}
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
              в Досугово-развивающем центре "Школа Неордината" (далее — Центр) в соответствии с 
              Федеральным законом от 27.07.2006 № 152-ФЗ "О персональных данных".
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Оператор персональных данных</h2>
            <p>
              <strong>Досугово-развивающий центр "Школа Неордината"</strong><br/>
              Адрес: 119334, г. Москва, ул. Косыгина, д. 13, п. 3<br/>
              Телефон: +7 985 875-75-92<br/>
              Email: neordinata@ya.ru
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Фамилия, имя, отчество</li>
              <li>Класс обучения</li>
              <li>Фамилия, имя, отчество родителя/законного представителя</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Цели обработки персональных данных</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Рассмотрение заявок на поступление в Центр</li>
              <li>Связь с родителями и законными представителями</li>
              <li>Информирование о деятельности Центра</li>
              <li>Ведение учета обучающихся</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Правовые основания обработки</h2>
            <p>
              Обработка персональных данных осуществляется на основании:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Согласия субъекта персональных данных</li>
              <li>Федерального закона "Об образовании в Российской Федерации"</li>
              <li>Федерального закона "О персональных данных"</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Сроки обработки</h2>
            <p>
              Персональные данные обрабатываются в течение срока, необходимого для достижения 
              целей обработки, но не более 5 лет с момента последнего взаимодействия.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Права субъекта персональных данных</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Получать информацию об обработке ваших персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
              <li>Отзывать согласие на обработку персональных данных</li>
              <li>Обращаться в уполномоченный орган по защите прав субъектов персональных данных</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Меры защиты</h2>
            <p>
              Мы принимаем необходимые правовые, организационные и технические меры для защиты 
              персональных данных от неправомерного или случайного доступа, уничтожения, изменения, 
              блокирования, копирования, распространения.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Контактная информация</h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <p>
              <strong>Email:</strong> neordinata@ya.ru<br/>
              <strong>Телефон:</strong> +7 985 875-75-92
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black py-6 px-8 lg:px-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Досугово-развивающий центр "Школа Неордината". Все права защищены.
          </p>
        </div>
      </footer>
    </main>
  );
}
