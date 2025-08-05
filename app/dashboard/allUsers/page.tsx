// // "use client";

// // import { useEffect, useState } from "react";
// // import ProfileCard from "@/components/profile-card";
// // import { User } from "@/lib/types";
// // import axios from "axios";

// // export default function DashboardPage() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchUsers() {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get("/api/user/allUsers");
// //         setUsers(res.data);
// //       } catch (error) {
// //         console.error("Error fetching users:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchUsers();
// //     console.log("Fetched users:", users);
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <p className="text-lg text-gray-500">Loading users...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col gap-6 w-full">
// //       <div className="flex flex-col gap-2">
// //         <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
// //       </div>

// //       <div className="grid gap-6 lg:grid-cols-3 ">
// //         {users.map((user) => (
// //           <ProfileCard key={user.id} user={user} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState, useMemo } from "react";
// import ProfileCard from "@/components/profile-card";
// import { User } from "@/lib/types";
// import axios from "axios";

// export default function DashboardPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     searchTerm: "",
//     department: "all",
//     jobTitle: "all",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         setLoading(true);
//         const res = await axios.get("/api/user/allUsers");
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUsers();
//   }, []);

//   // Filter and search logic
//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchesSearch =
//         filters.searchTerm === "" ||
//         (user.name &&
//           user.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
//         (user.department &&
//           user.department
//             .toLowerCase()
//             .includes(filters.searchTerm.toLowerCase())) ||
//         (user.jobTitle &&
//           user.jobTitle
//             .toLowerCase()
//             .includes(filters.searchTerm.toLowerCase()));

//       const matchesDepartment =
//         filters.department === "all" || user.department === filters.department;

//       const matchesJobTitle =
//         filters.jobTitle === "all" || user.jobTitle === filters.jobTitle;

//       return matchesSearch && matchesDepartment && matchesJobTitle;
//     });
//   }, [users, filters]);

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   // Get unique values for dropdowns
//   const departments = useMemo(
//     () => [...new Set(users.map((u) => u.department).filter(Boolean))],
//     [users]
//   );

//   const jobTitles = useMemo(
//     () => [...new Set(users.map((u) => u.jobTitle).filter(Boolean))],
//     [users]
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg text-gray-500">Loading users...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-6 w-full">
//       <div className="flex flex-col gap-2">
//         <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
//         <p className="text-gray-500">
//           {filteredUsers.length} users found ({users.length} total)
//         </p>
//       </div>

//       {/* Filter Controls */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Search
//           </label>
//           <input
//             type="text"
//             placeholder="Name, department, or job title..."
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={filters.searchTerm}
//             onChange={(e) =>
//               setFilters({ ...filters, searchTerm: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Department
//           </label>
//           <select
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={filters.department}
//             onChange={(e) =>
//               setFilters({ ...filters, department: e.target.value })
//             }
//           >
//             <option value="all">All Departments</option>
//             {departments.map((dept) => (
//               <option key={dept} value={dept}>
//                 {dept}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Job Title
//           </label>
//           <select
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             value={filters.jobTitle}
//             onChange={(e) =>
//               setFilters({ ...filters, jobTitle: e.target.value })
//             }
//           >
//             <option value="all">All Job Titles</option>
//             {jobTitles.map((title) => (
//               <option key={title} value={title}>
//                 {title}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* User Grid */}
//       <div className="grid gap-6 lg:grid-cols-3">
//         {currentUsers.map((user) => (
//           <ProfileCard key={user.id} user={user} />
//         ))}
//       </div>

//       {currentUsers.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No matching users found</p>
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//           className={`px-4 py-2 rounded ${
//             currentPage === 1
//               ? "bg-gray-100 cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           Previous
//         </button>

//         <span>
//           Page {currentPage} of {totalPages || 1}
//         </span>

//         <button
//           disabled={currentPage >= totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//           className={`px-4 py-2 rounded ${
//             currentPage >= totalPages
//               ? "bg-gray-100 cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState, useMemo } from "react";
import ProfileCard from "@/components/profile-card";
import { User } from "@/lib/types";
import axios from "axios";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    currentCompany: "all",
    // address: "all",
    jobTitle: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await axios.get("/api/user/allUsers");
        setUsers(res.data);
        console.log("Fetched users:", res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Updated filter logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search across multiple fields
      const matchesSearch =
        filters.searchTerm === "" ||
        (user.name &&
          user.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        (user.address &&
          user.address
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())) ||
        (user.jobTitle &&
          user.jobTitle
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())) ||
        (user.currentCompany &&
          user.currentCompany
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()));

      // Company filter
      const matchesCompany =
        filters.currentCompany === "all" ||
        user.currentCompany === filters.currentCompany;

      // Address filter
      // const matchesAddress =
      //   filters.address === "all" || user.address === filters.address;

      const matchesJobTitle =
        filters.jobTitle === "all" || user.jobTitle === filters.jobTitle;

      return matchesSearch && matchesCompany && matchesJobTitle;
    });
  }, [users, filters]);

  // && matchesAddress
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get unique values for dropdowns
  const companies = useMemo(
    () => [...new Set(users.map((u) => u.currentCompany).filter(Boolean))],
    [users]
  );

  // const addresses = useMemo(
  //   () => [...new Set(users.map((u) => u.address).filter(Boolean))],
  //   [users]
  // );

  const jobTitles = useMemo(
    () => [...new Set(users.map((u) => u.jobTitle).filter(Boolean))],
    [users]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-gray-500">
          {filteredUsers.length} users found ({users.length} total)
        </p>
      </div>

      {/* Updated Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            placeholder="Name, company, address, or job title..."
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
          />
        </div>

        {/* Company Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Company
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={filters.currentCompany}
            onChange={(e) =>
              setFilters({ ...filters, currentCompany: e.target.value })
            }
          >
            <option value="all">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Address Filter */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={filters.address}
            onChange={(e) =>
              setFilters({ ...filters, address: e.target.value })
            }
          >
            <option value="all">All Addresses</option>
            {addresses.map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div> */}

        {/* Job Title Filter (remains) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={filters.jobTitle}
            onChange={(e) =>
              setFilters({ ...filters, jobTitle: e.target.value })
            }
          >
            <option value="all">All Job Titles</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {currentUsers.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>

      {currentUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No matching users found</p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded ${
            currentPage >= totalPages
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
