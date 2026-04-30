"use client";

import { authClient } from "@/lib/auth-client";
import type { User } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
} | null>(null);

export const UserProvider = ({
  user: initialUser,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const id = session?.user?.id ?? initialUser?.id;
    if (!id) return;

    console.log("🔄 Fetching full user from DB for id:", id);

    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((fullUser) => {
        console.log("✅ Full DB user:", fullUser);
        console.log("📅 dateOfBirth from DB:", fullUser.dateOfBirth);
        console.log("🌐 socials from DB:", fullUser.socials);
        setUser(fullUser);
      })
      .catch((err) => console.error("❌ Failed to fetch full user:", err));
  }, [session?.user?.id]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
