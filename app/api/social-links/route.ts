import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET — fetch all links
export async function GET() {
  const links = await prisma.socialLink.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(links);
}

// PUT — update links (relies on client telling us they are admin)
export async function PUT(req: NextRequest) {
  const { socials, isAdmin } = await req.json();

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await prisma.$transaction([
    prisma.socialLink.deleteMany(),
    prisma.socialLink.createMany({ data: socials }),
  ]);

  return NextResponse.json({ success: true });
}
