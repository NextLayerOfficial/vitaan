"use server";
import { auth } from "@/lib/auth"; // your betterAuth instance
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function updateProfile(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const data = {
    // preferredName: formData.get("preferredName") as string,
    address: formData.get("address") as string,
    graduationYear: formData.get("graduationYear")
      ? parseInt(formData.get("graduationYear") as string)
      : null,
    department: formData.get("department") as string,
    currentCompany: formData.get("currentCompany") as string,
    jobTitle: formData.get("jobTitle") as string,
    phone: formData.get("phone") as string,
  };

  await prisma.user.update({
    where: { id: userId },
    data,
  });

  return { success: true };
}
