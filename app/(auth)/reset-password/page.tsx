// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client"; // you must define this

// export default function ResetPasswordPage() {
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState("");
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       setError("Missing or invalid token.");
//       return;
//     }

//     const { error } = await authClient.resetPassword({
//       newPassword,
//       token,
//     });

//     if (error) {
//       setError("Failed to reset password.");
//     } else {
//       router.push("/sign-in");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
//       <h1 className="text-xl font-bold">Reset Password</h1>
//       <input
//         type="password"
//         className="border p-2 w-full"
//         placeholder="Enter new password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         required
//       />
//       <button type="submit" className="bg-green-600 text-white px-4 py-2">
//         Reset Password
//       </button>
//       {error && <p className="text-red-600">{error}</p>}
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");

    if (!token) {
      setStatus("error");
      setError("Missing or invalid token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setError("Passwords do not match.");
      return;
    }

    const { error: resetError } = await authClient.resetPassword({
      newPassword,
      token,
    });

    if (resetError) {
      setStatus("error");
      setError("Failed to reset password. Please try again.");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-gray-600">
            Choose a new password for your account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6"
        >
          {/* New password */}
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-800"
            >
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-800"
            >
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg border border-gray-400 bg-gray-50 px-3 py-2 text-sm text-gray-800">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Resetting password...
              </span>
            ) : (
              "Reset password"
            )}
          </button>

          <p className="text-xs text-center text-gray-500">
            Remembered your password?{" "}
            <a
              href="/sign-in"
              className="font-medium underline underline-offset-2 hover:text-gray-800"
            >
              Go back to sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
