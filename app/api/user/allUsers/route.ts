import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        displayUsername: true,
        role: true,
        banned: true,

        banReason: true,
        graduationYear: true,
        department: true,
        socials: true,
        currentCompany: true,
        jobTitle: true,
        address: true,
        phone: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
