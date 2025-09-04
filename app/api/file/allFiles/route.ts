import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    // Validate parameters
    const currentPage = isNaN(page) || page < 1 ? 1 : page;
    const itemsPerPage = isNaN(limit) || limit < 1 || limit > 100 ? 20 : limit;
    const skip = (currentPage - 1) * itemsPerPage;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      approved: true, // ✅ only approved files
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { username: { contains: search, mode: "insensitive" } } },
      ];
    }

    // Fetch files and total count
    const [files, totalCount] = await Promise.all([
      prisma.file.findMany({
        skip,
        take: itemsPerPage,
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          size: true,
          type: true,
          key: true,
          category: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              image: true,
            },
          },
        },
      }),
      prisma.file.count({ where }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return NextResponse.json({
      files,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
      },
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
