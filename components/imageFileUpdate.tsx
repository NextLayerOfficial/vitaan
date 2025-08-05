// "use client";

// import { useState } from "react";

// export default function UserImageUpload({
//   onUploadSuccess,
// }: {
//   onUploadSuccess: (publicUrl: string) => void;
// }) {
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const ext = file.name.split(".").pop()?.toLowerCase();
//     const allowed = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff", "svg"];
//     if (!ext || !allowed.includes(ext)) {
//       setError("Invalid file type.");
//       return;
//     }

//     setIsUploading(true);
//     setError(null);

//     try {
//       // Step 1: Request presigned URL
//       const res = await fetch("/api/s3/s3uploadPublic", {
//         method: "POST",
//         body: JSON.stringify({
//           filename: file.name,
//           filetype: file.type,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });

//       const { uploadUrl, publicUrl } = await res.json();

//       // Step 2: Upload file to S3
//       const uploadRes = await fetch(uploadUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": file.type,
//         },
//         body: file,
//       });

//       if (!uploadRes.ok) throw new Error("Upload failed");

//       onUploadSuccess(publicUrl);
//     } catch (err: any) {
//       setError(err.message || "Upload error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block font-medium">Upload Profile Image</label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         disabled={isUploading}
//         className="block"
//       />
//       {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
//       {error && <p className="text-sm text-red-500">{error}</p>}
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function UserImageUpload({
  onUploadSuccess,
}: {
  onUploadSuccess: (publicUrl: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff", "svg"];
    if (!ext || !allowed.includes(ext)) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const res = await fetch("/api/s3/s3uploadPublic", {
        method: "POST",
        body: JSON.stringify({
          filename: file.name,
          filetype: file.type,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl, publicUrl } = await res.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      onUploadSuccess(publicUrl);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="profile-upload"
        className="text-sm font-medium text-gray-700 mb-2"
      >
        Select Image File
      </label>

      <div className="flex items-center gap-3">
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
        />
        {isUploading && (
          <span className="text-sm text-gray-500 animate-pulse">
            Uploading...
          </span>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
