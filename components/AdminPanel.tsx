// "use client";

// import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { Skeleton } from "@/components/ui/skeleton"; // 👈 Import your skeleton

// export type UserWithRole = {
//   id: string;
//   name: string;
//   email: string;
//   role?: string;
//   banned?: boolean;
// };

// export default function AdminPanel() {
//   const [users, setUsers] = useState<UserWithRole[]>([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function fetchUsers() {
//     setLoading(true);
//     try {
//       const res = await authClient.admin.listUsers({
//         query: {
//           limit: 10,
//           sortBy: "createdAt",
//         },
//       });
//       setUsers(res.data?.users ?? []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   async function makeAdmin(userId: string) {
//     await authClient.admin.setRole({ userId, role: "admin" });
//     fetchUsers();
//   }

//   async function banUser(userId: string) {
//     await authClient.admin.banUser({
//       userId,
//       banReason: "Violation of rules",
//       banExpiresIn: 60 * 60 * 24 * 7,
//     });
//     fetchUsers();
//   }

//   async function unbanUser(userId: string) {
//     await authClient.admin.unbanUser({ userId });
//     fetchUsers();
//   }

//   const handleClick = ({ userid }: { userid: string }) => {
//     router.push(`/dashboard/adminpage/targetpage?id=${userid}`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Admin Panel</h1>

//       <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
//         <table className="w-full text-sm text-left text-gray-700">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Action</th>
//               <th className="p-3">Email</th>
//               <th className="p-3 text-center">Role</th>
//               <th className="p-3 text-center">Banned</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading
//               ? Array.from({ length: 6 }).map((_, i) => (
//                   <tr key={i} className="border-t">
//                     <td className="p-3">
//                       <Skeleton className="h-4 w-24" />
//                     </td>
//                     <td className="p-3">
//                       <Skeleton className="h-4 w-16" />
//                     </td>
//                     <td className="p-3">
//                       <Skeleton className="h-4 w-32" />
//                     </td>
//                     <td className="p-3 text-center">
//                       <Skeleton className="h-4 w-16 mx-auto" />
//                     </td>
//                     <td className="p-3 text-center">
//                       <Skeleton className="h-4 w-12 mx-auto" />
//                     </td>
//                     <td className="p-3 text-center">
//                       <div className="flex justify-center gap-2">
//                         <Skeleton className="h-8 w-20" />
//                         <Skeleton className="h-8 w-20" />
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               : users.map((user) => (
//                   <tr key={user.id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{user.name}</td>
//                     <td
//                       className="p-3 text-blue-600 cursor-pointer hover:underline"
//                       onClick={() => handleClick({ userid: user.id })}
//                     >
//                       Edit
//                     </td>
//                     <td className="p-3">{user.email}</td>
//                     <td className="p-3 text-center">{user.role}</td>
//                     <td className="p-3 text-center">
//                       {user.banned ? "Yes" : "No"}
//                     </td>
//                     <td className="p-3">
//                       <div className="flex justify-center gap-2">
//                         {user.role !== "admin" && (
//                           <Button size="sm" onClick={() => makeAdmin(user.id)}>
//                             Make Admin
//                           </Button>
//                         )}
//                         {user.banned ? (
//                           <Button
//                             size="sm"
//                             onClick={() => unbanUser(user.id)}
//                             variant="outline"
//                           >
//                             Unban
//                           </Button>
//                         ) : (
//                           <Button
//                             size="sm"
//                             onClick={() => banUser(user.id)}
//                             variant="destructive"
//                           >
//                             Ban
//                           </Button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icons";

export type UserWithRole = {
  id: string;
  name: string;
  email: string;
  role?: string;
  banned?: boolean;
};

export default function AdminPanel() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        (user.name && user.name.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await authClient.admin.listUsers({
        query: {
          limit: 100, // Increased limit for client-side filtering
          sortBy: "createdAt",
        },
      });
      setUsers(res.data?.users ?? []);
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
    router.push(`/dashboard/adminpage/targetpage?id=${userid}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">
            {filteredUsers.length} of {users.length} users shown
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Action</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Banned</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-3">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="p-3">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="p-3 text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </td>
                  <td className="p-3 text-center">
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </td>
                </tr>
              ))
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td
                    className="p-3 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => handleClick({ userid: user.id })}
                  >
                    Edit
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 text-center">{user.role}</td>
                  <td className="p-3 text-center">
                    {user.banned ? "Yes" : "No"}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No users found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
