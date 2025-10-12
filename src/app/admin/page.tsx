'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  selfBio: string;
  directorBio: string;
  color: string;
  image: string;
}

interface EventData {
  title: string;
  description: string;
  photos: string[];
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'teachers' | 'events'>('teachers');
  const [isSaving, setIsSaving] = useState(false);

  // Teachers state
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Мария Алексеевна',
      subject: 'Биология',
      selfBio: 'Биология — это не только не страшно, но ещё и жутко интересно и полезно. Спонтанно мы занимаемся её изучением и применением в жизни буквально каждый день, а мне хочется сделать её немного более понятной и близкой.',
      directorBio: 'Мария Алексеевна - биолог. И поэтому в школе можно подержать на ладошке летучую мышь, ловить сбежавшего ежа...А еще можно раскрыв рот слушать ее уроки.',
      color: '#10b981',
      image: '/images/maria.png'
    }
  ]);

  // Events state
  const [eventData, setEventData] = useState<EventData>({
    title: 'Проектная деятельность',
    description: 'Сегодня прошла постерная сессия по проектам. Ребята из 5–10 классов представили результаты своих проектов друг другу и всем желающим.',
    photos: ['/images/event1.jpg', '/images/event2.jpg']
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert('Введите пароль администратора');
      return;
    }
    // серверная проверка токена
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: password })
      });
      if (!res.ok) {
        alert('Неверный пароль администратора');
        return;
      }
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminToken', password);
      await loadFromAPI();
    } catch (e) {
      alert('Ошибка проверки. Попробуйте позже.');
    }
  };

const loadFromAPI = async () => {
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data.teachers) && data.teachers.length > 0) {
      const mapped = data.teachers.map((t: any, idx: number) => ({
        id: String(idx + 1),
        name: t.name ?? '',
        subject: t.subject ?? '',
        selfBio: t.selfBio ?? '',
        directorBio: t.directorBio ?? '',
        color: t.color ?? '#3b82f6',
        image: t.image ?? '/images/default.png',
      }));
      setTeachers(mapped);
    }
    if (data.eventData) {
      setEventData({
        title: data.eventData.title ?? '',
        description: data.eventData.description ?? '',
        photos: Array.isArray(data.eventData.photos) ? data.eventData.photos : [],
      });
    }
  } catch {}
};

useEffect(() => {
  if (typeof window === 'undefined') return;
    (async () => {
      if (localStorage.getItem('adminAuth') === 'true') {
        const savedToken = localStorage.getItem('adminToken') || '';
        if (savedToken) {
          try {
            const res = await fetch('/api/admin/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: savedToken })
            });
            if (res.ok) {
              setIsAuthenticated(true);
              setPassword(savedToken);
              await loadFromAPI();
              return;
            } else {
              localStorage.removeItem('adminAuth');
              localStorage.removeItem('adminToken');
            }
          } catch {}
        }
      }
    })();
}, []);

  const handleSaveTeachers = async () => {
    await saveAll();
  };

  const handleSaveEvents = async () => {
    await saveAll();
  };

  const saveAll = async () => {
    try {
      setIsSaving(true);
      const adminToken = localStorage.getItem('adminToken') || password;
      const payload = {
        teachers: teachers.map(({ id, ...rest }) => rest),
        eventData,
      };
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken || '',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const msg = res.status === 401 ? 'Нет доступа: неверный пароль администратора (ADMIN_TOKEN)' : 'Ошибка сохранения контента';
        alert(`✗ ${msg}`);
        return;
      }
      alert('✅ Контент сохранён и опубликован!');
    } catch (e) {
      alert('✗ Ошибка сети при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  const addTeacher = () => {
    const newId = Date.now().toString();
    setTeachers([
      ...teachers,
      {
        id: newId,
        name: 'Новый учитель',
        subject: 'Предмет',
        selfBio: 'О себе...',
        directorBio: 'Глазами директора...',
        color: '#3b82f6',
        image: '/images/default.png'
      }
    ]);
  };

  const deleteTeacher = (id: string) => {
    if (confirm('Удалить этого учителя?')) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const updateTeacher = (id: string, field: keyof Teacher, value: string) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  // Загрузка изображения
  const handleImageUpload = async (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      updateTeacher(id, 'image', base64);
    };
    reader.readAsDataURL(file);
  };

  // Загрузка фото событий
  const handleEventPhotoUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setEventData(prev => ({
        ...prev,
        photos: [...prev.photos, base64]
      }));
    };
    reader.readAsDataURL(file);
  };

  const deleteEventPhoto = (index: number) => {
    setEventData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>ADMIN PANEL</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 bg-white text-black border-2 border-white"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            />
            <button
              type="submit"
              className="w-full bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Войти
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b-4 border-black">
          <h1 className="text-4xl font-bold">ADMIN PANEL</h1>
          <div className="flex gap-4">
            <Link href="/" className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors text-sm uppercase tracking-widest">
              На сайт
            </Link>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('adminAuth');
              }}
              className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm uppercase tracking-widest"
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-6 py-3 text-sm uppercase tracking-widest transition-colors border-2 border-black ${
              activeTab === 'teachers' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
            }`}
          >
            Учителя ({teachers.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 text-sm uppercase tracking-widest transition-colors border-2 border-black ${
              activeTab === 'events' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
            }`}
          >
            События
          </button>
        </div>

        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Управление учителями</h2>
              <button
                onClick={addTeacher}
                className="px-6 py-3 bg-[#10b981] text-white hover:bg-[#059669] transition-colors text-sm uppercase tracking-widest"
              >
                + Добавить
              </button>
            </div>

            <div className="space-y-6">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="border-4 border-black p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{teacher.name || 'Новый учитель'}</h3>
                    <button
                      onClick={() => deleteTeacher(teacher.id)}
                      className="px-4 py-2 bg-[#ef4444] text-white text-sm hover:bg-[#dc2626] uppercase tracking-widest"
                    >
                      Удалить
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Имя</label>
                      <input
                        type="text"
                        value={teacher.name}
                        onChange={(e) => updateTeacher(teacher.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Предмет</label>
                      <input
                        type="text"
                        value={teacher.subject}
                        onChange={(e) => updateTeacher(teacher.id, 'subject', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Цвет</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={teacher.color}
                          onChange={(e) => updateTeacher(teacher.id, 'color', e.target.value)}
                          className="w-16 h-10 border-2 border-black cursor-pointer"
                        />
                        <input
                          type="text"
                          value={teacher.color}
                          onChange={(e) => updateTeacher(teacher.id, 'color', e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-black"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Фото</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(teacher.id, file);
                        }}
                        className="w-full px-3 py-2 border-2 border-black"
                      />
                      {teacher.image && (
                        <div className="mt-2">
                          <img 
                            src={teacher.image} 
                            alt={teacher.name}
                            className="w-20 h-20 object-cover border-2 border-black"
                          />
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">О себе</label>
                      <textarea
                        value={teacher.selfBio}
                        onChange={(e) => updateTeacher(teacher.id, 'selfBio', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-black h-32"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Глазами директора</label>
                      <textarea
                        value={teacher.directorBio}
                        onChange={(e) => updateTeacher(teacher.id, 'directorBio', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-black h-32"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveTeachers}
              className="mt-8 w-full bg-black text-white px-6 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving ? 'Сохранение…' : '💾 Сохранить всех учителей'}
            </button>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Управление событиями</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Заголовок</label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Описание</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black h-40"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Фотографии</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleEventPhotoUpload(file);
                  }}
                  className="w-full px-3 py-2 border-2 border-black mb-4"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {eventData.photos.map((photo, i) => (
                    <div key={i} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Event ${i + 1}`}
                        className="w-full h-32 object-cover border-2 border-black"
                      />
                      <button
                        onClick={() => deleteEventPhoto(i)}
                        className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveEvents}
              className="mt-8 w-full bg-black text-white px-6 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving ? 'Сохранение…' : '💾 Сохранить события'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
