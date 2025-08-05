// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { Download } from "lucide-react";

// interface File {
//   id: string;
//   name: string;
//   size: number;
//   key: string;
//   createdAt: string | Date;
// }

// export default function MagazineGrid({ files }: { files: File[] }) {
//   const [loadingId, setLoadingId] = useState<string | null>(null);

//   async function handleDownload(key: string, originalName: string) {
//     try {
//       setLoadingId(key);
//       const res = await axios.post("/api/s3/s3download", { key });
//       const signedUrl = res.data.url;

//       const fileRes = await axios.get(signedUrl, { responseType: "blob" });

//       const url = window.URL.createObjectURL(new Blob([fileRes.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", originalName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Error downloading file:", error);
//       alert("Failed to download the file.");
//     } finally {
//       setLoadingId(null);
//     }
//   }

//   if (files.length === 0) {
//     return (
//       <p className="text-gray-500 text-center py-10">
//         No magazines uploaded yet.
//       </p>
//     );
//   }

//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       {files.map((file) => (
//         <div
//           key={file.id}
//           className="rounded-xl border border-gray-200 bg-gray-50 p-6 hover:shadow-md transition space-y-2"
//         >
//           <h3 className="text-lg font-semibold text-gray-800">{file.name}</h3>
//           <p className="text-sm text-gray-500">
//             Uploaded on {new Date(file.createdAt).toLocaleDateString()}
//           </p>
//           <p className="text-sm text-gray-400">
//             Size: {(file.size / 1024 / 1024).toFixed(2)} MB
//           </p>

//           <button
//             onClick={() => handleDownload(file.key, file.name)}
//             className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
//             disabled={loadingId === file.key}
//           >
//         <Download className="w-4 h-4" />
//             {loadingId === file.key ? "Downloading..." : "Download"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import axios from "axios";
import { useState } from "react";
import { Download } from "lucide-react";

interface File {
  id: string;
  name: string;
  size: number;
  key: string;
  createdAt: string | Date;
}

export default function MagazineGrid({ files }: { files: File[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  //   async function handleDownload(key: string, originalName: string) {
  //     try {
  //       setLoadingId(key);
  //       const res = await axios.post("/api/s3/s3download", { key });
  //       const signedUrl = res.data.url;

  //       const fileRes = await axios.get(signedUrl, { responseType: "blob" });

  //       const url = window.URL.createObjectURL(new Blob([fileRes.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", originalName);
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();
  //     } catch (error) {
  //       console.error("Error downloading file:", error);
  //       alert("Failed to download the file.");
  //     } finally {
  //       setLoadingId(null);
  //     }
  //   }
  async function handleDownload(key: string) {
    try {
      setLoadingId(key);

      // Get a presigned S3 URL from your backend
      const res = await axios.post("/api/s3/s3download", { key });
      const signedUrl = res.data.url;

      // Open the S3 file in a new tab directly (streamed from S3)
      window.open(signedUrl, "_blank");
    } catch (error) {
      console.error("Error opening S3 file:", error);
      alert("Failed to open the file.");
    } finally {
      setLoadingId(null);
    }
  }

  if (files.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No magazines uploaded yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition min-h-[240px]"
        >
          <div className="flex-1 space-y-2 overflow-hidden">
            {/* Title */}
            <h3
              className="text-lg font-semibold text-gray-800 truncate"
              title={file.name}
            >
              {file.name}
            </h3>

            {/* Date */}
            <p className="text-sm text-gray-500">
              Uploaded:{" "}
              <span className="whitespace-nowrap">
                {new Date(file.createdAt).toLocaleDateString()}
              </span>
            </p>

            {/* File Size */}
            <p className="text-sm text-gray-400 whitespace-nowrap">
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          {/* Button at Bottom */}
          <div className="pt-4">
            <button
              onClick={() => handleDownload(file.key)}
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-terracotta hover:bg-terracotta/80 rounded-lg transition"
              disabled={loadingId === file.key}
            >
              <Download className="w-4 h-4" />
              {loadingId === file.key ? "Downloading..." : "Download"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
