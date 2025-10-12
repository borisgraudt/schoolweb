# Настройка переменных окружения

Для работы формы обратной связи необходимо настроить Google Sheets API.

## Создайте файл `.env.local` в корне проекта:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
```

## Инструкция по настройке:

### 1. Создание проекта в Google Cloud Console
- Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
- Создайте новый проект или выберите существующий

### 2. Включение Google Sheets API
- В меню навигации выберите "APIs & Services" > "Library"
- Найдите "Google Sheets API" и включите его

### 3. Создание Service Account
- Перейдите в "APIs & Services" > "Credentials"
- Нажмите "Create Credentials" > "Service Account"
- Заполните форму и создайте аккаунт
- Скачайте JSON ключ

### 4. Настройка переменных окружения
- Откройте скачанный JSON файл
- Скопируйте значение `client_email` в `GOOGLE_CLIENT_EMAIL`
- Скопируйте значение `private_key` в `GOOGLE_PRIVATE_KEY`

### 5. Настройка Google Sheet
- Создайте новую Google Таблицу
- Дайте доступ для редактирования Service Account (используйте email из `GOOGLE_CLIENT_EMAIL`)
- Скопируйте ID таблицы из URL (находится между `/d/` и `/edit`)
- Вставьте ID в `GOOGLE_SHEET_ID`

### 6. Структура таблицы
Первая строка должна содержать заголовки:
- A: ФИО поступающего
- B: Класс
- C: ФИО родителя
- D: Email
- E: Телефон
- F: Дата и время
- G: Статус

### 7. Публикация админ-правок для всех (Vercel KV)
Чтобы изменения из `/admin` появлялись на продакшене у всех пользователей, подключите общий ключ-значение хранилище (Vercel KV REST API):

1. В Vercel → Project Settings → Environment Variables добавьте:
   - `KV_REST_API_URL` — URL вашего KV (из раздела Vercel KV)
   - `KV_REST_API_TOKEN` — токен доступа
   - `ADMIN_TOKEN` — ваш секретный пароль администратора (используется заголовком `x-admin-token`)

2. Войдите в `/admin` и используйте тот же пароль, что в `ADMIN_TOKEN`.

3. Кнопки «Сохранить ...» публикуют данные через `/api/content` в KV. Главная страница автоматически читает эти данные при загрузке.

Примечание: если переменные KV не заданы, сайт продолжит использовать дефолтные данные и правки не будут сохраняться глобально.

## Примечание
Без настройки переменных окружения форма обратной связи не будет работать, но остальной функционал сайта будет доступен.

