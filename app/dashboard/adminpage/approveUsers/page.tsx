"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Card, CardContent } from "@/components/ui/card";

type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending users
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/user/approveUsers");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  // Approve or Reject a user
  const handleAction = async (userId: string, action: "approve" | "reject") => {
    await fetch("/api/user/approveUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    });
    fetchUsers(); // refresh list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel – Pending Users</h1>

      {users.length === 0 ? (
        <p>No pending users 🎉</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <Card key={user.id} className="rounded-2xl shadow p-4">
              <CardContent className="space-y-3">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Name:</strong> {user.name ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Requested: {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-3">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleAction(user.id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleAction(user.id, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
