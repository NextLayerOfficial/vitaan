import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteObject } from "@/lib/s3";

// ✅ Get all pending users
export async function GET() {
  const users = await prisma.user.findMany({
    where: { status: "pending", role: "user" },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  return NextResponse.json(users);
}

// ✅ Approve or Reject a user
export async function POST(req: Request) {
  try {
    const { userId, action } = await req.json();

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (action === "approve") {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { status: "approved" },
      });
      return NextResponse.json({ success: true, action, user });
    }

    if (action === "reject") {
      // Get user first (to read image key)
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { image: true, imageKey: true },
      });

      // Delete image from S3 if exists
      if (user?.imageKey) {
        await deleteObject(user.imageKey);
      }

      // Delete user from DB
      await prisma.user.delete({
        where: { id: userId },
      });
      return NextResponse.json({ success: true, action });
    }

    // return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
