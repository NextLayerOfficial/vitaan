"use client";
import { useState, useEffect, JSX } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FileIcon,
  DownloadIcon,
  SearchIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  AudioIcon,
  TrashIcon,
} from "@/components/ui/icons"; // Added TrashIcon
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useUser } from "@/context/UserContext";

// File type definition
type FileType = {
  id: string;
  name: string;
  size: number;
  type: string;
  key: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    username: string | null;
    image: string | null;
  } | null;
};

const fileTypeIcons: { [key: string]: JSX.Element } = {
  Documents: <FileTextIcon className="w-8 h-8 text-blue-500" />,
  Images: <ImageIcon className="w-8 h-8 text-green-500" />,
  Videos: <VideoIcon className="w-8 h-8 text-purple-500" />,
  Audio: <AudioIcon className="w-8 h-8 text-yellow-500" />,
  Default: <FileIcon className="w-8 h-8 text-gray-500" />,
};

export default function FileDashboardPage() {
  const user = useUser();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [files, setFiles] = useState<FileType[]>([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 20,
    nextPage: null,
    prevPage: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || ""
  );
  const [deletingIds, setDeletingIds] = useState<string[]>([]); // Track deleting files

  // Fetch files based on query parameters
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("page", pagination.currentPage.toString());
        params.set("limit", pagination.itemsPerPage.toString());
        if (searchTerm) params.set("search", searchTerm);
        if (categoryFilter) params.set("category", categoryFilter);

        const res = await fetch(`/api/file/allFiles?${params.toString()}`);
        const data = await res.json();

        setFiles(data.files);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [
    searchParams,
    pagination.currentPage,
    categoryFilter,
    searchTerm,
    pagination.itemsPerPage,
  ]);

  // Update URL parameters when filters change
  const updateSearchParams = (params: { [key: string]: string }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    newSearchParams.set("page", "1");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Handle filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    updateSearchParams({ search: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    updateSearchParams({ category: e.target.value });
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  // async function handleDownload(key: string, originalName: string) {
  //   try {
  //     const res = await axios.post("/api/s3/s3download", { key });
  //     const signedUrl = res.data.url;

  //     const fileRes = await axios.get(signedUrl, { responseType: "blob" });

  //     const url = window.URL.createObjectURL(new Blob([fileRes.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", originalName);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     alert("Failed to download the file.");
  //   }
  // }

  // File deletion function
  async function handleDeleteFile(fileId: string, s3Key: string) {
    if (
      !window.confirm("Are you sure you want to delete this file permanently?")
    ) {
      return;
    }

    try {
      setDeletingIds((prev) => [...prev, fileId]);
      await axios.delete(
        `/api/s3/s3deleteFile?fileId=${fileId}&s3Key=${encodeURIComponent(
          s3Key
        )}`
      );

      // Optimistically remove file from UI
      setFiles((prev) => prev.filter((file) => file.id !== fileId));
      setPagination((prev) => ({
        ...prev,
        totalItems: prev.totalItems - 1,
      }));
    } catch (error) {
      console.error("Failed to delete file:", error);
      alert("Failed to delete file. Please try again.");
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== fileId));
    }
  }

  async function handleDownload(key: string) {
    try {
      const res = await axios.post("/api/s3/s3download", { key });
      const signedUrl = res.data.url;

      // Open the S3 file directly in a new browser tab
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error opening file:", error);
      alert("Failed to open the file.");
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      {user?.role === "admin" && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
          <p className="text-sm">
            You are logged in as an admin. You can manage files.
          </p>
        </div>
      )}
      {/* Header with Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {pagination.totalItems} files found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files or users..."
              className="pl-10 pr-4 py-2 rounded-lg"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full p-2 border rounded-lg bg-background"
            >
              <option value="">All Categories</option>
              <option value="vitaan_docs">Vitaan docs</option>
              <option value="smarika">Smarika</option>
              <option value="sarjana">Sarjana</option>
              {/* <option value="magazine">Magazine</option>
              <option value="general">General</option>
              <option value="others">Others</option> */}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-full h-48 rounded-lg" />
            ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && files.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <FileIcon className="w-16 h-16 text-gray-400" />
          <p className="mt-4 text-lg font-medium text-gray-500">
            No files found
          </p>
          <p className="text-gray-400">Try adjusting your search or filter</p>
        </div>
      )}

      {/* File Grid */}
      {!loading && files.length > 0 && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => {
              const IconComponent =
                fileTypeIcons[file.category] || fileTypeIcons.Default;
              return (
                <Card key={file.id} className="flex flex-col h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex-shrink-0">{IconComponent}</div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg font-medium truncate">
                        {file.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        {file.user?.name || file.user?.email || "Unknown user"}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-sm text-gray-600">
                      <p>Size: {formatFileSize(file.size)}</p>
                      <p>Category: {file.category}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(file.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        // onClick={() => handleDownload(file.key, file.name)}
                        onClick={() => handleDownload(file.key)}
                        className="cursor-pointer"
                      >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {user?.role === "admin" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteFile(file.id, file.key)}
                          disabled={deletingIds.includes(file.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6">
            <div className="text-sm text-gray-500">
              Showing{" "}
              {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}-
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems
              )}{" "}
              of {pagination.totalItems} files
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={pagination.currentPage === 1}
                onClick={() => goToPage(pagination.currentPage - 1)}
              >
                Previous
              </Button>

              {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                const page =
                  Math.max(
                    1,
                    Math.min(
                      pagination.totalPages - 4,
                      pagination.currentPage - 2
                    )
                  ) + i;

                return (
                  <Button
                    key={page}
                    variant={
                      pagination.currentPage === page ? "default" : "outline"
                    }
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => goToPage(pagination.currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
