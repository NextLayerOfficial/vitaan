// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // adjust the path to your prisma instance

// export async function GET(
//   req: NextRequest,
//   props: { params: Promise<{ id: string }> },
// ) {
//   const params = await props.params;
//   const user = await prisma.user.findUnique({
//     where: { id: params.id },
//   });
//   console.log("Fetching user with ID:", params.id);

//   if (!user)
//     return NextResponse.json({ error: "User not found" }, { status: 404 });

//   return NextResponse.json(user);
// }

// export async function PUT(
//   req: NextRequest,
//   props: { params: Promise<{ id: string }> },
// ) {
//   const params = await props.params;
//   const data = await req.json();

//   const updatedUser = await prisma.user.update({
//     where: { id: params.id },
//     data,
//   });

//   return NextResponse.json(updatedUser);
// }
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
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
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: {
      name: body.name,
      address: body.address,
      graduationYear: body.graduationYear ? Number(body.graduationYear) : null,
      department: body.department,
      currentCompany: body.currentCompany,
      jobTitle: body.jobTitle,
      phone: body.phone,
      imageKey: body.imageKey,
      image: body.image,
      socials: body.socials,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(updatedUser);
}
