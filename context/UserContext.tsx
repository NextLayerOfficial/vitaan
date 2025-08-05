"use client";

import type { User } from "@/lib/types";
import { createContext, useContext } from "react";

const UserContext = createContext<User | null>(null);

export const UserProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) => {
  console.log("User in context:", user);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
