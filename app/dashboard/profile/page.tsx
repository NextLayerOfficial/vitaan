"use client";

import UserProfile from "@/components/userProfile";
import { useUser } from "@/context/UserContext";
// import { User } from "@/components/userProfile";
import type { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const user = useUser();
  const [updatedUser, setupdatedUser] = useState(user);
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
    setupdatedUser(data);
  };

  return (
    <main className=" mx-auto mt-10 space-y-4">
      {updatedUser && (
        <UserProfile
          user={updatedUser}
          isEditable={false}
          EditingRights={true}
          onSave={handleSave}
          refprop={undefined}
        />
      )}
    </main>
  );
}
