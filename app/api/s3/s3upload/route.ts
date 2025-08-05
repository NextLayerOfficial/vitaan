import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/s3";
import path from "path";

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".rtf",
  ".odt",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
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
    console.log("File extension:", ext);
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: `Invalid file extension. Only document formats are allowed.` },
        { status: 400 }
      );
    }

    const { uploadUrl, key } = await getPresignedUploadUrl({
      filename,
      filetype,
    });

    return NextResponse.json({ uploadUrl, key });
  } catch (error) {
    console.error("Upload URL generation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
