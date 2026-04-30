"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function AdminFileApproval() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/file/pending").then((res) => setFiles(res.data));
  }, []);

  const handleAction = async (fileId: string, action: "approve" | "reject") => {
    await axios.post("/api/file/admin-approve", { fileId, action });
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Pending File Approvals</h2>
      {files.map((file) => (
        <div
          key={file.id}
          className="p-4 mb-3 border rounded flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{file.category}</p>
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => handleDownload(file.key)}
          >
            Download
          </Button>

          <div className="flex gap-2">
            <button
              onClick={() => handleAction(file.id, "approve")}
              className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(file.id, "reject")}
              className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
