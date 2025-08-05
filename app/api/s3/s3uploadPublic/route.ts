import { NextRequest, NextResponse } from "next/server";
import { getPresignedPublicUploadUrl } from "@/lib/s3";
import path from "path";

const ALLOWED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".bmp",
  ".tiff",
  ".svg",
];

export async function POST(req: NextRequest) {
  try {
    const { filename, filetype } = await req.json();
    if (!filename || !filetype) {
      return NextResponse.json(
        { error: "Missing filename or filetype" },
        { status: 400 }
      );
    }
    const ext = path.extname(filename).toLowerCase();

    if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: "Invalid file extension. Only image files are allowed." },
        { status: 400 }
      );
    }

    const { uploadUrl, key, publicUrl } = await getPresignedPublicUploadUrl({
      filename,
      filetype,
    });
    return NextResponse.json({ uploadUrl, key, publicUrl });
  } catch (error) {
    console.error("Public upload URL generation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
