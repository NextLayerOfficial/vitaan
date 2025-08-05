"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // you must define this

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage("Error sending reset link.");
    } else {
      setMessage("Check your email for the reset link.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold">Forgot Password</h1>
      <input
        type="email"
        className="border p-2 w-full"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Send Reset Link
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
