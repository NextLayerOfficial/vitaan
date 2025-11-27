"use client";

import { useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

export default function S3Uploader() {
  const user = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [category, setCategory] = useState("document");

  const handleUpload = async () => {
    if (!file || !user?.id) {
      toast("Missing file or user ID");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Step 1: Get presigned URL
      const presignRes = await axios.post("/api/s3/s3upload", {
        filename: file.name,
        filetype: file.type,
      });

      const { uploadUrl, key } = presignRes.data;

      // Step 2: Upload file directly to S3
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / (event.total || 1));
          setProgress(percent);
        },
      });

      // Step 3: Store metadata in DB
      await axios.post("/api/file/save-file", {
        name: file.name,
        size: file.size,
        type: file.type,
        key,
        category,
        userId: user.id,
      });

      // Step 4: Success output
      setUrl(`https://your-bucket-name.s3.amazonaws.com/${key}`);
      toast("Upload successful!");
    } catch (err) {
      console.error("Upload error:", err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Upload failed.");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Upload failed.");
      }
    } finally {
      setUploading(false);
      setFile(null);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload File</h2>

      {/* File input */}
      <label className="block mb-3 text-sm font-medium text-gray-700">
        Choose file:
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />

      {/* Category dropdown */}
      <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">
        Select Category:
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="application">Application</option>
        <option value="document">Document</option>
        <option value="magazine">Magazine</option>
        <option value="general">general</option>
        <option value="others">Others</option>
      </select>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-6 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Progress bar */}
      {uploading && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Uploaded URL */}
      {url && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 break-words">
          ✅ File uploaded successfully:{" "}
        </div>
      )}
    </div>
  );
}
