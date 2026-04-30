// "use client";

// import type { User } from "@/lib/types";
// import { createContext, useContext } from "react";

// const UserContext = createContext<User | null>(null);

// export const UserProvider = ({
//   user,
//   children,
// }: {
//   user: User | null;
//   children: React.ReactNode;
// }) => {
//   return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };

"use client";

import type { User } from "@/lib/types";
import { createContext, useContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
