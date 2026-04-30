"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Shield, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";

export default function ProfileCard({ user }: { user?: User }) {
  const router = useRouter();

  const handleClick = ({ userid }: { userid: string | undefined }) => {
    router.push(`/dashboard/allUsers/userprofile?id=${userid}`);
  };

  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm rounded-xl">
      {/* Banner and avatar */}
      <CardHeader className="relative p-0">
        <div className="h-32 bg-sandalwood" />
        <div className="absolute -bottom-12 left-6">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage
              src={user?.image || ""}
              alt={user?.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="text-4xl font-semibold bg-muted text-muted-foreground">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>

      <CardContent className="pt-16 pb-6 px-6 h-full">
        {/* Name and Company */}
        <div className="space-y-1 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {user?.name || "Unknown User"}
          </h3>
          {user?.currentCompany && (
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>{user.currentCompany}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Info rows */}
        <div className="space-y-4 text-sm text-gray-700">
          {user?.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-500">{user.address}</p>
              </div>
            </div>
          )}

          {user?.email && (
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <div className=" w-[80%] mx-auto mb-6">
        <button
          onClick={() => handleClick({ userid: user?.id })}
          className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #c9a882 0%, #7b5c38 100%)",
            color: "#fff",
          }}
        >
          View full profile
        </button>
      </div>
    </Card>
  );
}

// ("use client");

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Mail,
//   MapPin,
//   Briefcase,
//   CalendarDays,
//   ArrowUpRight,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { User } from "@/lib/types";

// export default function ProfileCard({ user }: { user?: User }) {
//   const router = useRouter();

//   const handleClick = ({ userid }: { userid: string | undefined }) => {
//     router.push(`/dashboard/allUsers/userprofile?id=${userid}`);
//   };

//   const initials = user?.name
//     ?.split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <Card className="overflow-hidden border-0 shadow-md rounded-2xl bg-white group hover:shadow-xl transition-shadow duration-300">
//       {/* Banner */}
//       <CardHeader className="relative p-0">
//         <div
//           className="h-28 w-full"
//           style={{
//             background:
//               "linear-gradient(135deg, #c9a882 0%, #a07850 40%, #7b5c38 100%)",
//           }}
//         />

//         {/* Avatar — overlaps banner */}
//         <div className="absolute -bottom-10 left-5">
//           <div
//             className="rounded-xl p-0.5 shadow-lg"
//             style={{ background: "linear-gradient(135deg, #c9a882, #7b5c38)" }}
//           >
//             <Avatar className="h-20 w-20 rounded-[10px] border-2 border-white">
//               <AvatarImage
//                 src={user?.image || ""}
//                 alt={user?.name || "User"}
//                 className="object-cover rounded-[10px]"
//               />
//               <AvatarFallback
//                 className="text-2xl font-semibold rounded-[10px]"
//                 style={{ background: "#f5ede3", color: "#7b5c38" }}
//               >
//                 {initials || "?"}
//               </AvatarFallback>
//             </Avatar>
//           </div>
//         </div>

//         {/* View profile button — top right of banner */}
//         <button
//           onClick={() => handleClick({ userid: user?.id })}
//           className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
//           style={{
//             background: "rgba(0,0,0,0.35)",
//             backdropFilter: "blur(4px)",
//           }}
//         >
//           View profile
//           <ArrowUpRight className="w-3 h-3" />
//         </button>
//       </CardHeader>

//       <CardContent className="pt-14 pb-5 px-5">
//         {/* Name + role */}
//         <div className="mb-5">
//           <h3 className="text-[17px] font-semibold text-gray-900 leading-tight">
//             {user?.name || "Unknown User"}
//           </h3>
//           {user?.currentCompany && (
//             <p className="text-sm mt-0.5" style={{ color: "#a07850" }}>
//               {user.jobTitle ? `${user.jobTitle} · ` : ""}
//               {user.currentCompany}
//             </p>
//           )}
//         </div>

//         {/* Divider */}
//         <div
//           className="w-full h-px mb-5"
//           style={{
//             background: "linear-gradient(to right, #e8d5c0, transparent)",
//           }}
//         />

//         {/* Info rows */}
//         <div className="space-y-3">
//           {/* DOB — placeholder text only for now */}
//           <InfoRow
//             icon={
//               <CalendarDays
//                 className="w-3.5 h-3.5"
//                 style={{ color: "#c9a882" }}
//               />
//             }
//             label="Date of birth"
//             value="—"
//             placeholder
//           />

//           {user?.address && (
//             <InfoRow
//               icon={
//                 <MapPin className="w-3.5 h-3.5" style={{ color: "#c9a882" }} />
//               }
//               label="Location"
//               value={user.address}
//             />
//           )}

//           {user?.email && (
//             <InfoRow
//               icon={
//                 <Mail className="w-3.5 h-3.5" style={{ color: "#c9a882" }} />
//               }
//               label="Email"
//               value={user.email}
//             />
//           )}

//           {user?.department && (
//             <InfoRow
//               icon={
//                 <Briefcase
//                   className="w-3.5 h-3.5"
//                   style={{ color: "#c9a882" }}
//                 />
//               }
//               label="Department"
//               value={user.department}
//             />
//           )}
//         </div>

//         {/* Footer CTA */}
//         <button
//           onClick={() => handleClick({ userid: user?.id })}
//           className="mt-5 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
//           style={{
//             background: "linear-gradient(135deg, #c9a882 0%, #7b5c38 100%)",
//             color: "#fff",
//           }}
//         >
//           View full profile
//         </button>
//       </CardContent>
//     </Card>
//   );
// }

// function InfoRow({
//   icon,
//   label,
//   value,
//   placeholder = false,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   placeholder?: boolean;
// }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <div
//         className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
//         style={{ background: "#f5ede3" }}
//       >
//         {icon}
//       </div>
//       <div className="min-w-0 flex-1">
//         <span className="text-xs text-gray-400 block leading-none mb-0.5">
//           {label}
//         </span>
//         <span
//           className={`text-sm truncate block leading-tight ${
//             placeholder ? "text-gray-300 italic" : "text-gray-700"
//           }`}
//         >
//           {value}
//         </span>
//       </div>
//     </div>
//   );
// }
