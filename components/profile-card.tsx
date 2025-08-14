"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

      <CardContent className="pt-16 pb-6 px-6">
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

          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Full Profile</p>
              <button
                className="text-[#7b6550] hover:underline transition"
                onClick={() => handleClick({ userid: user?.id })}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
