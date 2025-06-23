// app/target/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserProfile, { User } from "@/components/userProfile";

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

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <UserProfile user={user} isEditable={true} onSave={handleSave} />;
}
