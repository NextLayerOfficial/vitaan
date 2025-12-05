import prisma from "@/lib/prisma";

export async function getLatestMagazineFiles() {
  return await prisma.file.findMany({
    // where: { category: "magazine" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}
