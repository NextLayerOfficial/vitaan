// /app/api/get-url/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getObjectUrl } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const signedUrl = await getObjectUrl(key);

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}
