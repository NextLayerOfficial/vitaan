// app/target/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserProfile from "@/components/userProfile";
import { User } from "@/lib/types";
import UserProfileSkeleton from "@/components/ui/UserProfileSkeleton";

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (updatedUser: User) => {
    const res = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await res.json();
    setUser(data);
  };

  if (loading) return <UserProfileSkeleton />;
  if (!user) return <div>User not found</div>;

  return (
    <UserProfile
      user={user}
      isEditable={true}
      refprop={undefined}
      onSave={handleSave}
      EditingRights={true} // Assuming you want to allow editing rights for this page
    />
  );
}

