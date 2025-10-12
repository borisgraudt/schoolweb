import { NextRequest, NextResponse } from "next/server";

// In production, prefer a shared store (e.g., Vercel KV). As a lightweight
// default, we will use Vercel Edge Config or KV if provided, else fallback to
// in-memory (which only works per instance). To ensure global persistence,
// set KV_REST_API_URL and KV_REST_API_TOKEN env vars for Vercel KV REST API.

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

// Minimal KV REST client
async function kvGet(key: string): Promise<any | null> {
  const base = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!base || !token) return null;
  const res = await fetch(`${base}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data?.result ?? null;
}

async function kvSet(key: string, value: any): Promise<boolean> {
  const base = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!base || !token) return false;
  const res = await fetch(`${base}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
  return res.ok;
}

const DEFAULT_KEY = "schoolweb:content";

export async function GET() {
  try {
    // Try KV first
    const stored = await kvGet(DEFAULT_KEY);
    if (stored) {
      return NextResponse.json(stored, { status: 200 });
    }

    // Fallback: return empty structure so UI falls back to defaults client-side
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

    const ok = await kvSet(DEFAULT_KEY, body);
    if (!ok) {
      return NextResponse.json({ error: "KV not configured" }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}


