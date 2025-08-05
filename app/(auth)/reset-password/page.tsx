"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // you must define this

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Missing or invalid token.");
      return;
    }

    const { error } = await authClient.resetPassword({
      newPassword,
      token,
    });

    if (error) {
      setError("Failed to reset password.");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold">Reset Password</h1>
      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        Reset Password
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
