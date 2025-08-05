// /app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const body = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        address: body.address,
        graduationYear: body.graduationYear,
        department: body.department,
        socials: body.socials,
        currentCompany: body.currentCompany,
        jobTitle: body.jobTitle,
        phone: body.phone,
        image: body.image,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("User update failed:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
