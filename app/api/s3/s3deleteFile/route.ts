// app/api/file/deleteFile/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteObject } from "@/lib/s3";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    const s3Key = searchParams.get("s3Key");

    if (!fileId || !s3Key) {
      return NextResponse.json(
        { error: "Missing fileId or s3Key" },
        { status: 400 }
      );
    }

    // Delete from S3
    await deleteObject(s3Key);

    // Delete from database
    await prisma.file.delete({
      where: { id: fileId },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
