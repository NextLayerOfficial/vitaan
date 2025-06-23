"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import type { User } from "@/lib/types";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await authClient.admin.listUsers({
        query: {
          limit: 10,
          sortBy: "createdAt",
        },
      });
      console.log("Fetched users:", res);
      setUsers(res.data?.users);
      console.log("Users:", res.data?.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function makeAdmin(userId: string) {
    await authClient.admin.setRole({ userId, role: "admin" });
    fetchUsers();
  }

  async function banUser(userId: string) {
    await authClient.admin.banUser({
      userId,
      banReason: "Violation of rules",
      banExpiresIn: 60 * 60 * 24 * 7, // 1 week
    });
    fetchUsers();
  }

  async function unbanUser(userId: string) {
    await authClient.admin.unbanUser({ userId });
    fetchUsers();
  }

  const handleClick = ({ userid }: { userid: string }) => {
    router.push(`/admin/target?id=${userid}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">address</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Banned</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.name}</td>
                <td
                  className="p-2"
                  onClick={() => handleClick({ userid: user.id })}
                >
                  edit
                </td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 text-center">{user.role}</td>
                <td className="p-2 text-center">
                  {user.banned ? "Yes" : "No"}
                </td>
                <td className="p-2 space-x-2 flex justify-center">
                  {user.role !== "admin" && (
                    <Button size="sm" onClick={() => makeAdmin(user.id)}>
                      Make Admin
                    </Button>
                  )}
                  {user.banned ? (
                    <Button
                      size="sm"
                      onClick={() => unbanUser(user.id)}
                      variant="outline"
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => banUser(user.id)}
                      variant="destructive"
                    >
                      Ban
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


