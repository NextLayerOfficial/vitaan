import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, context: any) {
  const userId = context?.params?.id;

  console.log("🟢 API: PUT /api/firstTimeUser/[id]");
  console.log("➡️ Received userId:", userId);

  try {
    const body = await req.json();
    console.log("📦 Request body:", body);

    const dataToUpdate = {
      imageKey: body.imageKey,
      address: body.address,
      graduationYear: body.graduationYear,
      department: body.department,
      socials: body.socials,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
      currentCompany: body.currentCompany,
      jobTitle: body.jobTitle,
      phone: body.phone,
      image: body.image,
      updatedAt: new Date(),
    };

    console.log("📝 Data to update in Prisma:", dataToUpdate);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    console.log("✅ User successfully updated:", updatedUser);

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("❌ User update failed:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
