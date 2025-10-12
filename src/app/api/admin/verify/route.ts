import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const expected = process.env.ADMIN_TOKEN || "";
    if (!expected) {
      return NextResponse.json({ error: "ADMIN_TOKEN is not set" }, { status: 500 });
    }
    if (token && token === expected) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}


