import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";
import { google } from 'googleapis';
import type { sheets_v4 } from 'googleapis';

// Инициализация Google Sheets API
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!clientEmail || !privateKey) {
  throw new Error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY environment variables.');
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Неверные данные формы" },
        { status: 400 }
      );
    }

    const { applicantName, class: classNumber, parentName, email, phone, source } = result.data;

    const status = 'на рассмотрении'; // Автоматическое значение для этапа поступления

    // Добавление данных в Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:G', // Расширен диапазон до столбца G
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[applicantName, classNumber, parentName, email, `'${phone}`, source, status]],
      },
    } as sheets_v4.Params$Resource$Spreadsheets$Values$Append);

    if (response.status !== 200) {
      throw new Error('Ошибка при добавлении данных в таблицу');
    }

    return NextResponse.json(
      { message: "Данные успешно отправлены!" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    return NextResponse.json(
      { error: "Ошибка при отправке данных" },
      { status: 500 }
    );
  }
} 