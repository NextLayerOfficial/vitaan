// app/api/save-file/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust to your prisma import path

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, size, type, key, category, userId } = body;

    // Basic validation
    if (!name || !size || !type || !key || !category || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const file = await prisma.file.create({
      data: {
        name,
        size,
        type,
        key,
        category,
        userId,
        approved: false, // 👈 mark as pending
      },
    });

    return NextResponse.json({ success: true, file }, { status: 201 });
  } catch (err) {
    console.error("Error saving file:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
