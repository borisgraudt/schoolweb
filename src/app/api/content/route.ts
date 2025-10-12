import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

// Используем Vercel Blob для глобального хранения JSON c контентом
// Требуется переменная окружения: BLOB_READ_WRITE_TOKEN (Project Settings → Tokens)

type Teacher = {
  name: string;
  subject: string;
  selfBio: string;
  directorBio: string;
  color: string;
  image?: string; // base64 or URL
};

type EventData = {
  title: string;
  description: string;
  photos: string[]; // base64 or URLs
};

type Payload = {
  teachers: Teacher[];
  eventData: EventData;
};
const BLOB_NAME = "schoolweb/content.json";

export async function GET() {
  try {
    // Check if blob exists
    try {
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      const files = await list({ prefix: BLOB_NAME, token });
      const found = files.blobs?.find(b => b.pathname === BLOB_NAME);
      if (found?.url) {
        const file = await fetch(found.url, { cache: "no-store" });
        if (file.ok) {
          const json = await file.json();
          return NextResponse.json(json, { status: 200 });
        }
      }
    } catch {}

    // Fallback: return empty structure
    const empty: Payload = {
      teachers: [],
      eventData: { title: "", description: "", photos: [] },
    };
    return NextResponse.json(empty, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Simple auth: require ADMIN_TOKEN header if provided as env
    const required = process.env.ADMIN_TOKEN;
    if (required) {
      const provided = req.headers.get("x-admin-token");
      if (!provided || provided !== required) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = (await req.json()) as Payload;
    if (!body || !Array.isArray(body.teachers) || !body.eventData) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Blob token missing" }, { status: 500 });
    }

    const res = await put(BLOB_NAME, JSON.stringify(body), {
      access: "public",
      contentType: "application/json",
      token,
    });
    if (!res?.url) {
      return NextResponse.json({ error: "Failed to write blob" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, url: res.url }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}


