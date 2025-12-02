// "use client";

// import { useState } from "react";
// import { authClient } from "@/lib/auth-client"; // you must define this

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { error } = await authClient.requestPasswordReset({
//       email,
//       redirectTo: `${window.location.origin}/reset-password`,
//     });

//     if (error) {
//       setMessage("Error sending reset link.");
//     } else {
//       setMessage("Check your email for the reset link.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
//       <h1 className="text-xl font-bold">Forgot Password</h1>
//       <input
//         type="email"
//         className="border p-2 w-full"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2">
//         Send Reset Link
//       </button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setStatus("error");
      setMessage("Couldn't send the reset link. Try again.");
    } else {
      setStatus("success");
      setMessage("A reset link has been sent to your email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            Forgot Password
          </h1>
          <p className="text-sm text-neutral-600">
            Enter your email and we’ll send you a password reset link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
        >
          {/* Email field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/40"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <p className="text-xs text-neutral-500">
              We&apos;ll send a secure link to this address.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center rounded-lg bg-black text-white px-4 py-2.5 text-sm font-medium shadow transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-transparent" />
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Message */}
          {message && (
            <div
              className={`rounded-lg border px-3 py-2 text-sm ${
                status === "success"
                  ? "border-neutral-300 bg-neutral-100 text-neutral-700"
                  : status === "error"
                  ? "border-neutral-300 bg-neutral-100 text-neutral-700"
                  : "border-neutral-300 bg-neutral-100 text-neutral-800"
              }`}
            >
              {message}
            </div>
          )}

          {/* Secondary link */}
          <p className="text-xs text-center text-neutral-600">
            Remembered your password?{" "}
            <a
              href="/sign-in"
              className="underline underline-offset-2 hover:text-black"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
