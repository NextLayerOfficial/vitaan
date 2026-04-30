"use client";

import UserProfile from "@/components/userProfile";
import { useUser } from "@/context/UserContext";

import type { User } from "@/lib/types";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, setUser } = useUser()!;

  useEffect(() => {
    if (!user) {
      console.error("User data is not available");
    } else {
      console.log("User data:", user);
    }
  }, [user]);

  const handleSave = async (updatedUser: User) => {
    const res = await fetch(`/api/user/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await res.json();
    setUser(data); // 👈 updates context instead of local state
  };

  return (
    <main className=" mx-auto mt-10 space-y-4">
      {user && (
        <UserProfile
          user={user!}
          isEditable={false}
          EditingRights={true}
          onSave={handleSave}
          refprop={undefined}
        />
      )}
    </main>
  );
}
