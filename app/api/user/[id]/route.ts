import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust the path to your prisma instance

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  console.log("Fetching user with ID:", params.id);

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(updatedUser);
}
