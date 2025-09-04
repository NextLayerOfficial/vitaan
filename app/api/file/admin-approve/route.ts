// app/api/file/admin-approve/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteObject } from "@/lib/s3";

export async function POST(req: Request) {
  try {
    const { fileId, action } = await req.json();

    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (action === "approve") {
      await prisma.file.update({
        where: { id: fileId },
        data: { approved: true },
      });
      return NextResponse.json({ success: true, approved: true });
    }

    if (action === "reject") {
      // 1. Delete from S3
      await deleteObject(file.key);

      // 2. Delete from DB
      await prisma.file.delete({ where: { id: fileId } });

      return NextResponse.json({ success: true, approved: false });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Admin approval error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
